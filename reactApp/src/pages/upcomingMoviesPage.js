import React, {useContext} from "react";
import PageTemplate from '../components/templateMovieListPage'
import AddToWatchListButton from '../components/buttons/addToWatchList'
import {MoviesContext} from '../contexts/moviesContext'

const UpcomingMovieListPage = () => {
  const context = useContext(MoviesContext);
  const upcoming = context.upcoming.filter(m => ! m.watchList);
  return (
      <PageTemplate
        title='Upcoming Movies'
        movies={upcoming}
        action={(movie) => {
          return <AddToWatchListButton movie={movie} />;
        }}
      />
  );
};

export default UpcomingMovieListPage;