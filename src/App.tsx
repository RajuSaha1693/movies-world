import { useState } from 'react'
// import './App.css'
import { searchMovies } from './services/axiosInstance';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid2';
import TextField from '@mui/material/TextField';
import MovieCard from './components/MovieCard';
function App() {
  const [searchTerm, setSearchTerm] = useState('');
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [movies, setMovies] = useState<any[]>([]);
  const [typingTimeout, setTypingTimeout] = useState<NodeJS.Timeout | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const handleSearch = async (searchStr: string) => {
    setIsLoading(true);
    try {
      const data = await searchMovies(searchStr);
      setMovies(data.Search || []);
    } catch (error) {
      console.error('Error during movie search:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    if (typingTimeout) clearTimeout(typingTimeout);
    setTypingTimeout(
      setTimeout(() => {
        if (value.trim()) {
          handleSearch(value.trim());
        } else {
          setMovies([]);
        }
      }, 2000)
    );
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      if (typingTimeout) clearTimeout(typingTimeout);
      if (searchTerm.trim()) {
        handleSearch(searchTerm.trim());
      }
    }
  };

  return (
    <Container maxWidth={false}>
      <Grid container spacing={2}>
        <Grid size={12}>
          <TextField
            type="text"
            value={searchTerm}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            label="Movie Title"
            variant="outlined"
            sx={{ width: '100%' }}
          />
          {isLoading && <p>Loading...</p>}
          <div style={{padding:"24px"}}>
            {movies.length > 0 ? (
              <Grid container  spacing={2}>
                {!isLoading && movies.map((movie) => (
                  <Grid size={{ xs: 12, sm: 3, md: 2 }} key={movie.imdbID}>
                    <MovieCard movie={movie} />
                  </Grid>
                ))}
              </Grid>
            ) : (
              !isLoading && <p>No results found</p>
            )}
          </div>


        </Grid>
      </Grid>
    </Container>
  )
}

export default App
