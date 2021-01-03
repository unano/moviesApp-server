import { useEffect, useState } from "react";
import {getSimilarMovies} from '../api/tmdb-api';

const useSimilarMovie = id => {
  const [similarMovies, setSimilarMovies] = useState([]);
  useEffect(() => {
    getSimilarMovies(id).then(movie => {
      setSimilarMovies(movie.results);
    });
  }, [id]);
  return [similarMovies, setSimilarMovies];
};

export default useSimilarMovie