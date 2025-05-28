import css from './MovieModal.module.css'
import { createPortal } from 'react-dom';
import { useEffect } from 'react';
import type { Movie } from '../../types/movie';


interface MovieModalProps {
  movie: Movie
  onClose: () => void; 
  
}

export default function MovieModal({ movie, onClose }: MovieModalProps) {
 //закриття при кліку на фон
  const handleBackdropClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };
//Побічні ефекти: скрол і Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [onClose]);

   // Визначення шляху до зображення
  let imageSrc: string | null = null;

  if (movie.backdrop_path) {
   imageSrc = `https://image.tmdb.org/t/p/w780${movie.backdrop_path}`;
  } else if (movie.poster_path) {
    imageSrc = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
  } else {
    imageSrc = 'https://placehold.co/500x750?text=No+Image';
  }

    return createPortal (
         
       <div 
       className={css.backdrop} 
       role="dialog" 
       aria-modal="true"
       onClick={handleBackdropClick}>

  <div className={css.modal}>
    <button 
     className={css.closeButton} 
     onClick={() => onClose()}  
     aria-label="Close modal">
      &times;
    </button>
    
//заміна src 

  {imageSrc ? (
    <img
      src={imageSrc}
      alt={movie.title || "Movie poster"}
      className={css.image}
    />
  ) : (<div className={css.noImage}>Image unavailable</div>)
  }
    

    <div className={css.content}>
      <h2>{movie.title}</h2>
      <p>{movie.overview || 'Description missing.'}</p>
      <p>
        <strong>Release Date:</strong>{movie.release_date || 'Unknown'} 
      </p>
      <p>
        <strong>Rating:</strong>{movie.vote_average/10}
      </p>
    </div>
  </div>
</div>,
document.body



    )
}