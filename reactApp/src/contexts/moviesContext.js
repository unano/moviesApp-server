import React, { useState, createContext, useEffect, useReducer } from "react";
import { getMovies, getUpcomingMovies, getTopRatedMovies, addFavorites, addWatchList, addCollections ,removeWatchList} from "../api/movie-api";

export const MoviesContext = createContext(null);

const reducer = (state, action) => {
  switch (action.type) {
    case "load":
      return { movies: action.payload.movies, upcoming: [...state.upcoming], topRated: [...state.topRated] };
    case "load-upcoming":
      return { upcoming: action.payload.movies, movies: [...state.movies], topRated: [...state.topRated] };
    case "load-topRated":
      return { topRated: action.payload.movies, movies: [...state.movies], upcoming: [...state.upcoming] };
    case "add-review":
      return {
        movies: state.movies.map((m) =>
          m.id === action.payload.movie.id
            ? { ...m, review: action.payload.review }
            : m
        ),
        upcoming: [...state.upcoming],
        topRated: [...state.topRated]
      };
    default:
      return state;
  }
};

const MoviesContextProvider = (props) => {
  const [state, dispatch] = useReducer(reducer, { movies: [], upcoming: [] , topRated: []});
  const [authenticated, setAuthenticated] = useState(false);
  
  const addToFavorites = (userName,movieId) => {
    addFavorites(userName,movieId);
  };

  const addReview = (movie, review) => {
    dispatch({ type: "add-review", payload: { movie, review } });
  };

  const addToWatchList = (userName,movieId) => {
    addWatchList(userName,movieId);
  };
  const removeFromWatchList = (userName,movieId) => {
    removeWatchList(userName,movieId);
  };

  const addToCollections = (userName,movieId) => {
    addCollections(userName,movieId);
  };

  useEffect(() => {
    getMovies().then((movies) => {
      dispatch({ type: "load", payload: { movies } });
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    getUpcomingMovies().then((movies) => {
      dispatch({ type: "load-upcoming", payload: { movies } });
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    getTopRatedMovies().then((movies) => {
      dispatch({ type: "load-topRated", payload: { movies } });
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <MoviesContext.Provider
      value={{
        movies: state.movies,
        upcoming: state.upcoming,
        topRated:state.topRated,
        addToFavorites: addToFavorites,
        addReview: addReview,
        addToWatchList:addToWatchList,
        addToCollections: addToCollections,
        removeFromWatchList:removeFromWatchList
      }}
    >
      {props.children}
    </MoviesContext.Provider>
  );
};

export default MoviesContextProvider;