import { getMovieDetailsById } from './api';

export async function forUseEffect({ error, set, data, id, path, controller }) {
  async function fetchData() {
    try {
      error(false);

      const fetchedMovieDetails = await getMovieDetailsById(id, path, controller);
      if (data) {
        set(fetchedMovieDetails[data]);
      } else {
        set(fetchedMovieDetails);
      }
    } catch (error) {
      if (error.code !== 'ERR_CANCELED') {
        error(true);
      }
    }
  }
  fetchData();
}
