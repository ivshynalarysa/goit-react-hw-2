import css from "./MovieGrid.module.css";
import { type Movie } from "../../types/movie";

interface MovieGridProps {
    onSelect: (movie: Movie) => void;
    movies: Movie[];
}

export default function MovieGrid({ onSelect, movies }: MovieGridProps) {
    return (
        
            <ul className={css.grid}>
                {movies.map((movie) => {
                    const imageSrc = movie.poster_path
                      ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                      : "https://placehold.co/500x750?text=No+Image"; // 🛑 Додай локальний fallback у public/

                    return (
                        <li key={movie.id}>
                            <div className={css.card} onClick={() => onSelect(movie)} >
                                <img
                                    className={css.image}
                                    src={imageSrc}
                                    alt={movie.title || "Movie poster"}
                                    loading="lazy"
                                />
                                <h2 className={css.title}>{movie.title}</h2>
                            </div>
                        </li>
                    );
                })}
            </ul>
        
    );
}