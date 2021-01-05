import React, { useState, createContext, useEffect, useReducer } from "react";
import { getMovies, getUpcomingMovies, getTopRatedMovies } from "../api/movie-api";

export const MoviesContext = createContext(null);

const reducer = (state, action) => {
  switch (action.type) {
    case "add-favorite":
      return {
        movies: state.movies.map((m) =>
          m.id === action.payload.movie.id ? { ...m, favorite: true } : m
        ),
        upcoming: [...state.upcoming],
        topRated: [...state.topRated]
      };
    case "add-watchList":
      return {
        upcoming: state.upcoming.map((m) =>
          m.id === action.payload.upcoming.id ? { ...m, watchList: true } : m
      ),
        movies: [...state.movies],
        topRated: [...state.topRated]
      };
      case "remove-watchList":
        return {
          upcoming: state.upcoming.map((m) =>
            m.id === action.payload.upcoming.id ? { ...m, watchList: false } : m
        ),
          movies: [...state.movies],
          topRated: [...state.topRated]
        };
    case "add-Collections":
        return {
          topRated: state.topRated.map((m) =>
            m.id === action.payload.topRated.id ? { ...m, collections: true } : m
        ),
          movies: [...state.movies],
          upcoming: [...state.upcoming]
        };
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
  
  const addToFavorites = (movieId) => {
    const index = state.movies.map((m) => m.id).indexOf(movieId);
    dispatch({ type: "add-favorite", payload: { movie: state.movies[index] } });
  };

  const addReview = (movie, review) => {
    dispatch({ type: "add-review", payload: { movie, review } });
  };

  const addToWatchList = (movieId) => {
    const index = state.upcoming.map((m) => m.id).indexOf(movieId);
    dispatch({ type: "add-watchList", payload: { upcoming: state.upcoming[index] } });
  };
  const removeFromWatchList = (movieId) => {
    const index = state.upcoming.map((m) => m.id).indexOf(movieId);
    dispatch({ type: "remove-watchList", payload: { upcoming: state.upcoming[index] } });
  };

  const addToCollections = (movieId) => {
    const index = state.topRated.map((m) => m.id).indexOf(movieId);
    dispatch({ type: "add-Collections", payload: { topRated: state.topRated[index] } });
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