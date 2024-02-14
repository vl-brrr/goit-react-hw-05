import { Route, Routes } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import Navbar from './Navbar/NavBar';
import { Loader } from './Loader/Loader';

function App() {
  const Home = lazy(() => import('../pages/HomePage'));
  const Movies = lazy(() => import('../pages/MoviesPage'));
  const MovieDetails = lazy(() => import('../pages/MovieDetailsPage/MovieDetailsPage'));
  const MovieCast = lazy(() => import('./MovieCast/MovieCast'));
  const MovieReviews = lazy(() => import('./MovieReviews/MovieReviews'));

  return (
    <>
      <Navbar />

      <Suspense fallback={<Loader />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/movies" element={<Movies />} />
          <Route path="/movies/:movieId" element={<MovieDetails />}>
            <Route path="/movies/:movieId/cast" element={<MovieCast />} />
            <Route path="/movies/:movieId/reviews" element={<MovieReviews />} />
          </Route>
          <Route path="*" element={<Home />} />
        </Routes>
      </Suspense>
    </>
  );
}

export default App;
