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
  const [selectedCard, setSelectedCard] = useState<Movie | null>(null);


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
     setSelectedCard(movie);
}

function handleCloseModal(): void {
  setSelectedCard(null);
}
  

  return (
    
      <div className={css.app}>
        <SearchBar onSubmit={handleSubmit}/>
        <Toaster 
          /*position="top-center"
          reverseOrder={false}*/
        />
        {isLoading && <Loader/>}
        {isError && <ErrorMessage/>}
        <MovieGrid onSelect={selectCard} movies={movies} />
        {selectedCard && <MovieModal movie={selectedCard} onClose={handleCloseModal} />}
      
      </div>

    )
  
}




