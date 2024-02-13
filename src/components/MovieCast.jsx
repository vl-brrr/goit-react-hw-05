import { forUseEffect } from '../fetch';
import { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import ErrorMessage from './ErrorMessage';
import poster from '../assets/no_poster.jpg';
import css from './MovieCast.module.css';

export default function MovieCast() {
  const [movieCast, setMovieCast] = useState(null);
  const [error, setError] = useState(false);

  const { movieId } = useParams();

  const linkRef = useRef(null);

  useEffect(() => {
    const controller = new AbortController();

    async function fetch() {
      const settings = {
        error: setError,
        set: setMovieCast,
        data: 'cast',
        id: movieId,
        path: '/credits',
        controller: controller,
      };
      await forUseEffect(settings);
    }
    fetch();
    return () => {
      controller.abort();
    };
  }, [movieId]);

  useEffect(() => {
    const topPoint = linkRef.current.getBoundingClientRect().top;

    setTimeout(
      () =>
        window.scrollTo({
          behavior: 'smooth',
          top: topPoint,
        }),
      1000
    );
  }, [linkRef]);

  return (
    <div ref={linkRef} style={{ marginBottom: '15px' }}>
      {error && <ErrorMessage />}
      {movieCast && (
        <ul className={css.list}>
          {movieCast.map(({ profile_path, id, name, character }) => {
            return (
              <li key={id} className={css.card}>
                <img
                  src={profile_path ? `https://image.tmdb.org/t/p/w185/${profile_path}` : poster}
                  alt={name}
                />
                <div className={css.textWrapper}>
                  <span className={css.actor}>{name}</span>
                  <p className={css.character}>{character}</p>
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
