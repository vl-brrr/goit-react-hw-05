import { Suspense, useEffect, useRef, useState } from 'react';
import { useParams, Link, Outlet, useLocation } from 'react-router-dom';
import { forUseEffect } from '../../fetch';
import { Loader } from '../../components/Loader/Loader';
import Container from '../../components/Container/Container';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';
import poster from '../../assets/no_poster_500.jpg';
import css from './MovieDetailsPage.module.css';
import { FaArrowLeft } from 'react-icons/fa6';

export default function MovieDetailsPage() {
  const location = useLocation();
  const backLinkRef = useRef(location.state);

  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    const controller = new AbortController();

    async function fetch() {
      const settings = {
        error: setError,
        set: setMovie,
        data: '',
        id: movieId,
        path: '',
        controller: controller,
      };
      await forUseEffect(settings);
    }
    fetch();
    return () => {
      controller.abort();
    };
  }, [movieId]);

  //   const { title, vote_average, vote_count, overview, poster_path, genres } = movie;

  return (
    <Container>
      <Link to={backLinkRef.current ?? '/'} className={css.backBtn}>
        <FaArrowLeft style={{ marginRight: '6px' }} />
        Back
      </Link>
      {movie && (
        <div>
          <div style={{ display: 'flex', gap: '20px', marginBottom: '15px' }}>
            <img
              className={css.poster}
              src={
                movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : poster
              }
              alt={movie.title}
            />
            <div>
              <h1>
                {movie.title}({movie.release_date.slice(0, 4)})
              </h1>
              <span>
                <b>Rating: </b>
                {+movie.vote_average.toFixed(1)} ({movie.vote_count})
              </span>
              <h2>Overview</h2>
              <p>{movie.overview}</p>
              <h2>Genres</h2>
              <p>{movie.genres.map(({ name }) => name).join(', ')}</p>
              <div style={{ marginTop: '15px' }}>
                <Link to="cast" className={css.backBtn} style={{ margin: '0 15px 0 0' }}>
                  Cast
                </Link>
                <Link to="reviews" className={css.backBtn} style={{ margin: '0' }}>
                  Reviews
                </Link>
              </div>
            </div>
          </div>

          <Suspense fallback={<Loader />}>
            <Outlet />
          </Suspense>
        </div>
      )}

      {error && <ErrorMessage />}
    </Container>
  );
}
