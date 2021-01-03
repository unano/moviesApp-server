import React from "react";
import { Link } from "react-router-dom";
import "../../globals/fontawesome";
import "./similarMovieCard.css";
const SimilarMovieCard = ({movie}) => {

  return (
    <div className="">
    <div className="similarMovie">
    <div className="similarMovieCard">
    <Link to={`/movies/${movie.id}`}>
      <img
        className="card-img-tag center " id="movpic2"
        alt=""
        src={
          movie.poster_path
            ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}`
            : "./film-poster-placeholder.png"
        }
      />
      </Link>
    <p className="subheadInfo" id="title2">{movie.title}</p>
    </div>
    </div>
  </div>
    
  );
};

export default SimilarMovieCard;