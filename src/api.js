import axios from 'axios';

const accesToken =
  'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwZDU0NzEzNDE5MGYyNDY4MjU5NTE3ZDExYmRjMWQ1YyIsInN1YiI6IjY1YzdhZDRiZTRiNTc2MDE3ZDE0ZTdkZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.hU6JNSlZztPKXVDZJH8WIq5QK4vn6NeXQTbHvIsqlkE';

export async function getTrendingMovies(page, abortController) {
  const response = await axios.get('https://api.themoviedb.org/3/trending/movie/day', {
    headers: {
      Authorization: 'Bearer ' + accesToken,
    },
    params: { page },
    signal: abortController.signal,
  });

  return response.data;
}

export async function getMoviesByName(page, query, abortController) {
  const response = await axios.get('https://api.themoviedb.org/3/search/movie', {
    headers: {
      Authorization: 'Bearer ' + accesToken,
    },
    params: { page, query },
    signal: abortController.signal,
  });
  return response.data;
}

export async function getMovieDetailsById(id, path, abortController) {
  const response = await axios.get(`https://api.themoviedb.org/3/movie/${id + path}`, {
    headers: {
      Authorization: 'Bearer ' + accesToken,
    },
    signal: abortController.signal,
  });
  return response.data;
}
