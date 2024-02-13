import { getTrendingMovies } from '../api';
import { useState, useEffect } from 'react';
import Container from '../components/Container';
import PageTitle from '../components/PageTitle';
import ErrorMessage from '../components/ErrorMessage';
import { useLocation } from 'react-router-dom';
import MovieList from '../components/MovieList';
import { LoadMoreBtn } from '../components/LoadMoreBtn';

export default function HomePage() {
  const [page, setPage] = useState(1);
  const [movies, setMovies] = useState([]);
  const [lastPage, setLastPage] = useState(false);
  const [error, setError] = useState(false);

  const location = useLocation();

  const handleLoadMore = () => {
    setPage(page + 1);
  };

  useEffect(() => {
    const controller = new AbortController();

    async function fetchData() {
      try {
        setError(false);
        setLastPage(false);
        const fetchedData = await getTrendingMovies(page, controller);
        setMovies(prevMovies => [...prevMovies, ...fetchedData.results]);
        if (page === fetchedData.total_pages) {
          setLastPage(true);
        }
      } catch (error) {
        if (error.code !== 'ERR_CANCELED') {
          setError(true);
        }
      }
    }
    fetchData();
    return () => {
      controller.abort();
    };
  }, [page]);

  return (
    <Container>
      <PageTitle>Trending today</PageTitle>
      {movies.length > 0 && <MovieList movies={movies} location={location} />}
      {movies.length > 0 && !lastPage && <LoadMoreBtn loadMore={handleLoadMore} />}
      {error && <ErrorMessage />}
    </Container>
  );
}
