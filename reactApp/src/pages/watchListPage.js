import React, {useContext, useState, useEffect} from "react";
import MovieListPageTemplate from "../components/templateMovieListPage";
import RemoveFromWatchListButton from '../components/buttons/removeFromWatchlist'
import {getWatchList} from "../api/movie-api";
import {AuthContext} from '../contexts/authContext';

const WatchListPage = props => {
  const authContext = useContext(AuthContext);
  const [watchList,setWatchList]=useState([]);
  useEffect(() => {
    getWatchList(authContext.userName).then(user => {
      setWatchList(user);
    });
  },[authContext.userName]);

  return (
    <MovieListPageTemplate
      movies={watchList}
      title={"WatchList Movies"}
      action={movie => <RemoveFromWatchListButton movie={movie} />}
    />
  );
};

export default WatchListPage;