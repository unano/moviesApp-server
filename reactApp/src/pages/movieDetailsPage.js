import React from "react";
import { Link, Route, withRouter } from "react-router-dom";
import MovieDetails from "../components/movieDetails";
import PageTemplate from "../components/templateMoviePage";
import MovieReviews from "../components/movieReviews";
import SimilarMovieLists from "../components/similarMovieList";
import useMovie from "../hooks/useMovie";
import useSimilarMovie from "../hooks/useSimilarMovie";

const MoviePage = props => {
  const { id } = props.match.params;
  const [movie] = useMovie(id);
  const [similarMovies]=useSimilarMovie(id);
  return (
    <>
    {movie ? (
      <>
        <PageTemplate movie={movie}>
          <MovieDetails movie={movie} />
        </PageTemplate>
        <div className="row">
          <div className="col-12 ">
            {!props.history.location.pathname.endsWith("/reviews") ? (
              <Link
                className="btn alert-info  btn-block active"
                to={`/movies/${id}/reviews`}
              >
                Show Reviews (Extracts)
              </Link>
            ) : (
              <Link
                className="btn alert-info  btn-block active"
                to={`/movies/${id}`}
              >
                Hide Reviews 
              </Link>
            )}
          </div>
        </div>
        <Route
          path={`/movies/:id/reviews`}
          render={props => <MovieReviews movie={movie} {...props} />}
        />
        <p style={{fontSize:25, fontWeight:300, marginTop:20, marginBottom:4}}>similar movies</p>
        <SimilarMovieLists movies={similarMovies}/>
      </>
    ) : (
      <p>Waiting for movie details</p>
    )}
  </>
  );
};

export default withRouter(MoviePage);