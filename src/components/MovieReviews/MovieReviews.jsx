import { forUseEffect } from '../../fetch';
import { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import css from './MovieReviews.module.css';

export default function MovieReviews() {
  const [movieReviews, setMovieReviews] = useState([]);
  const [error, setError] = useState(false);

  const { movieId } = useParams();

  const linkRef = useRef(null);

  useEffect(() => {
    const controller = new AbortController();

    async function fetch() {
      const settings = {
        error: setError,
        set: setMovieReviews,
        data: 'results',
        id: movieId,
        path: '/reviews',
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
      {movieReviews.length > 0 ? (
        <ul>
          {movieReviews.map(({ author, id, content }) => {
            return (
              <li key={id} className={css.card}>
                <p className={css.author}>{author}</p>
                <p>{content}</p>
              </li>
            );
          })}
        </ul>
      ) : (
        <span>No one has left a review for this movie yet.</span>
      )}
    </div>
  );
}
