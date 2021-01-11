import React, {useContext, useState, useEffect} from "react";
import MovieListPageTemplate from "../components/templateMovieListPage";
import AddReviewButton from '../components/buttons/addReview'
import {getCollections} from "../api/movie-api";
import {AuthContext} from '../contexts/authContext';

const CollectionPage = props => {
  const authContext = useContext(AuthContext);
  const [collections,setCollections]=useState([]);
  useEffect(() => {
    getCollections(authContext.userName).then(user => {
      setCollections(user);
    });
  },[authContext.userName]);
  console.log(collections)

  return (
    <MovieListPageTemplate
      movies={collections}
      title={"Collection List"}
      action={movie => <AddReviewButton movie={movie} />}
    />
  );
};

export default CollectionPage;