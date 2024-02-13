import './App.css';
import { Route, Routes } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import Navbar from './NavBar';
import { Loader } from './Loader';

function App() {
  const Home = lazy(() => import('../pages/HomePage'));
  const Movies = lazy(() => import('../pages/MoviesPage'));
  const MovieDetails = lazy(() => import('../pages/MovieDetailsPage'));
  const MovieCast = lazy(() => import('../components/MovieCast'));
  const MovieReviews = lazy(() => import('../components/MovieReviews'));

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
