import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import App from '../App';
import { searchMovies } from '../services/axiosInstance';
import '@testing-library/jest-dom';
jest.mock('../services/axiosInstance', () => ({
  searchMovies: jest.fn(),
}));

describe('App Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders App component', () => {
    render(<App />);
    expect(screen.getByLabelText(/movie title/i)).toBeInTheDocument();
    expect(screen.getByText(/no results found/i)).toBeInTheDocument();
  });

  test('initial state', () => {
    render(<App />);
    expect(screen.queryByText(/loading.../i)).not.toBeInTheDocument();
    expect(screen.queryByText(/no results found/i)).toBeInTheDocument();
  });

  test('updates search term on typing', () => {
    render(<App />);
    const input = screen.getByLabelText(/movie title/i);
    fireEvent.change(input, { target: { value: 'Inception' } });
    expect(input).toHaveValue('Inception');
  });

  test("fetches movies on valid search term", async () => {
    const mockMovies = {
      Search: [
        { Title: "Inception", Year: "2010", imdbID: "tt1375666", Poster: "inception.jpg" },
      ],
    };
    (searchMovies as jest.Mock).mockResolvedValue(mockMovies);
    render(<App />);
    const input = screen.getByLabelText(/movie title/i);
    fireEvent.change(input, { target: { value: "Inception" } });
    fireEvent.keyDown(input, { key: "Enter", code: "Enter" });
    await waitFor(() => expect(searchMovies).toHaveBeenCalledWith("Inception"));
    expect(screen.getByText("Inception")).toBeInTheDocument();
  });

  test('shows loading while fetching movies', async () => {
    const mockMovies = {
      Search: [{ Title: 'Inception', Year: '2010', imdbID: 'tt1375666', Poster: 'url' }],
    };
    (searchMovies as jest.Mock).mockResolvedValueOnce(mockMovies);

    render(<App />);
    const input = screen.getByLabelText(/movie title/i);
    fireEvent.change(input, { target: { value: 'Inception' } });
    fireEvent.keyDown(input, { key: "Enter", code: "Enter" });
    expect(screen.getByText(/loading.../i)).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.queryByText(/loading.../i)).not.toBeInTheDocument();
      expect(screen.getByText(/inception/i)).toBeInTheDocument();
    });
  });

  test('handles Enter key press to search', async () => {
    const mockMovies = {
      Search: [{ Title: 'Inception', Year: '2010', imdbID: 'tt1375666', Poster: 'url' }],
    };
    (searchMovies as jest.Mock).mockResolvedValueOnce(mockMovies);

    render(<App />);
    const input = screen.getByLabelText(/movie title/i);
    fireEvent.change(input, { target: { value: 'Inception' } });
    fireEvent.keyDown(input, { key: 'Enter', code: 'Enter' });

    await waitFor(() => {
      expect(searchMovies).toHaveBeenCalledWith('Inception');
      expect(screen.getByText(/inception/i)).toBeInTheDocument();
    });
  });

  test('clears movies on empty search term', async () => {
    render(<App />);
    const input = screen.getByLabelText(/movie title/i);

    fireEvent.change(input, { target: { value: 'Inception' } });
    fireEvent.change(input, { target: { value: '' } });

    await waitFor(() => {
      expect(screen.getByText(/no results found/i)).toBeInTheDocument();
    });
  });

  test('displays "No results found" when no movies are returned', async () => {
    (searchMovies as jest.Mock).mockResolvedValueOnce({ Search: [] });

    render(<App />);
    const input = screen.getByLabelText(/movie title/i);
    fireEvent.change(input, { target: { value: 'InvalidMovie' } });

    await waitFor(() => {
      expect(screen.getByText(/no results found/i)).toBeInTheDocument();
    });
  });
});
