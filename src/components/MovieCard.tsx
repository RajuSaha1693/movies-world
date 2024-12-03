import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Box from '@mui/material/Box';
import "./movieCard.css"
import Typography from '@mui/material/Typography';
interface MovieCardProps {
    Title: string,
    Year: string,
    imdbID: string,
    Type: string,
    Poster: string
}
const MovieCard: React.FC<{ movie: MovieCardProps }> = ({ movie }) => {
    return (
        <Card
      className="movie-card"
      style={{ backgroundImage: `url(${movie.Poster})` }}
    >
      <Box className="movie-year-badge">{movie.Year}</Box>
      <CardContent className="movie-card-content">
        <Typography className="movie-title">{movie.Title}</Typography>
      </CardContent>
    </Card>
    )
}

export default MovieCard