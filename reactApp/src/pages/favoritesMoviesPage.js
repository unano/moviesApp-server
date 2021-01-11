import React, {useContext, useState, useEffect} from "react";
import MovieListPageTemplate from "../components/templateMovieListPage";
import AddReviewButton from '../components/buttons/addReview'
import {getFavourite} from "../api/movie-api";
import {AuthContext} from '../contexts/authContext';

const FavoriteMoviesPage = props => {
  const authContext = useContext(AuthContext);
  const [favourite,setFavourite]=useState([]);
  useEffect(() => {
    getFavourite(authContext.userName).then(user => {
      setFavourite(user);
    });
  },[authContext.userName]);

  return (
    <MovieListPageTemplate
      movies={favourite}
      title={"Favorite Movies"}
      action={movie => <AddReviewButton movie={movie} />}
    />
  );
};

export default FavoriteMoviesPage;