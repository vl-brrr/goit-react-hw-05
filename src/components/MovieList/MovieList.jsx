import { Link } from 'react-router-dom';
import poster from '../../assets/no_poster.jpg';
import css from './MovieList.module.css';

export default function MovieList({ movies, location }) {
  return (
    <ul className={css.list}>
      {movies.map(({ id, title, poster_path }) => {
        return (
          <li key={id} className={css.item}>
            <Link to={`/movies/${id}`} state={location} className={css.link}>
              <img
                src={poster_path ? `https://image.tmdb.org/t/p/w185${poster_path}` : poster}
                alt={title}
              />
              <span className={css.movieTitle}>{title}</span>
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
