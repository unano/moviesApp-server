import React, { useContext } from "react";
import PageTemplate from '../components/templateMovieListPage'
import {MoviesContext} from '../contexts/moviesContext'
import AddToCollectionsButton from '../components/buttons/addToCollections'

const TopRatedMoviesPage = () => {
  const context = useContext(MoviesContext);
  const movies = context.topRated.filter((m) => {  // New
    return !("collections" in m);
  });

  return (
    <PageTemplate
      title="topRated Movies"
      movies={movies}  /* Changed */
      action={(movie) => {
        return <AddToCollectionsButton movie={movie} />;
      }}
    />
  );
};

export default TopRatedMoviesPage;