import { useState, useEffect } from 'react';
import SearchBar from '../components/SearchBar/SearchBar';
import { getMoviesByName } from '../api';
import { Toaster } from 'react-hot-toast';
import MovieList from '../components/MovieList/MovieList';
import { useLocation, useSearchParams } from 'react-router-dom';
import Container from '../components/Container/Container';
import { LoadMoreBtn } from '../components/LoadMoreBtn/LoadMoreBtn';
import ErrorMessage from '../components/ErrorMessage/ErrorMessage';

export default function MoviesPage() {
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [movies, setMovies] = useState([]);
  const [lastPage, setLastPage] = useState(false);
  const [error, setError] = useState(false);

  const [params, setParams] = useSearchParams();
  const queryParams = params.get('query') ?? '';

  const handleLoadMore = () => {
    setPage(page + 1);
  };

  const searchMovies = async newQuery => {
    setQuery(`${Date.now()}/${newQuery}`);
    setPage(1);
    setMovies([]);
    params.set('query', newQuery);
    setParams(params);
  };

  const location = useLocation();

  useEffect(() => {
    const controller = new AbortController();

    if (query === '' && queryParams === '') {
      return;
    }
    async function fetchData() {
      try {
        setError(false);
        setLastPage(false);
        const fetchedData = await getMoviesByName(
          page,
          query.split('/')[1] || queryParams,
          controller
        );
        setMovies(prevMovies => [...prevMovies, ...fetchedData.results]);
        if (page === fetchedData.total_pages) {
          setLastPage(true);
        }
      } catch (error) {
        setError(true);
      }
    }
    fetchData();
    return () => {
      controller.abort();
    };
  }, [query, page, queryParams]);

  return (
    <Container>
      <SearchBar onSubmit={searchMovies} />
      {movies.length > 0 && <MovieList movies={movies} location={location} />}
      {movies.length > 0 && !lastPage && <LoadMoreBtn loadMore={handleLoadMore} />}
      {error && <ErrorMessage />}
      <Toaster
        position="top-right"
        containerStyle={{
          top: 10,
        }}
        toastOptions={{
          error: {
            iconTheme: {
              primary: '#BF1F2C',
              secondary: 'white',
            },
          },
        }}
      />
    </Container>
  );
}
