import React, {useContext} from "react";
import MovieListPageTemplate from "../components/templateMovieListPage";
import AddReviewButton from '../components/buttons/addReview'
import {MoviesContext} from '../contexts/moviesContext'

const CollectionPage = props => {
  const context = useContext(MoviesContext);
  const collection = context.topRated.filter( m => m.collections )

  return (
    <MovieListPageTemplate
      movies={collection}
      title={"Collection List"}
      action={movie => <AddReviewButton movie={movie} />}
    />
  );
};

export default CollectionPage;