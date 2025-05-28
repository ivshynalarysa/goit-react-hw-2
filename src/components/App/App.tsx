import css from './App.module.css';
import SearchBar from '../SearchBar/SearchBar';
import { fetchMovies } from '../../services/movieService';
import toast, {Toaster} from 'react-hot-toast';
import MovieModal from '../MovieModal/MovieModal';
import MovieGrid from '../MovieGrid/MovieGrid';
import Loader from '../Loader/Loader';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import { useState } from 'react';
import type { Movie } from '../../types/movie'

export default function App() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);


async function handleSubmit(data: string): Promise<void> {
      
    try {
      setMovies([])
      setIsLoading(true);
      setIsError(false);
      const newMovies = await fetchMovies(data);
      setMovies(newMovies);
      if (newMovies.length === 0) {
        toast.error("No movies found for your request.");
      }
      
    } catch {
        toast.error("Failed to fetch movies. Please try again.");
        setIsError(true);
    } finally {
        setIsLoading(false);
    }
  };
  
function selectCard(movie: Movie): void {
     setSelectedMovie(movie);
}

function handleCloseModal(): void {
  setSelectedMovie(null);
}
  

  return (
    
      <div className={css.app}>
        <SearchBar onSubmit={handleSubmit}/>
        <Toaster 
            toastOptions={{
            error: {
            style: {
            color: 'white',
            background: 'red',
      },
    },
  }}
        />
        {isLoading && <Loader/>}
        {isError && <ErrorMessage/>}
        <MovieGrid onSelect={selectCard} movies={movies} />
        {selectedMovie && <MovieModal movie={selectedMovie} onClose={handleCloseModal} />}
      
      </div>

    )
  
}




