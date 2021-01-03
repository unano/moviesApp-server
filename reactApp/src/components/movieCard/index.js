import React from "react";
import { Link } from "react-router-dom";
import "./movieCard.css";
import "../../globals/fontawesome";

const MovieCard = ({movie, action}) => {

  return (
    <div className="col-sm-2">
      <div className="cardOutside">
      <div className="card">
      <p className="pStyle1">
            <div className="vote-mark "> {movie.vote_average}</div>
      </p>
      <Link to={`/movies/${movie.id}`}>
        <img
          className="card-img-tag center "
          alt={movie.title}
          src={
            movie.poster_path
              ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}`
              : "./film-poster-placeholder.png"
          }
        />
        </Link>
        <div className="card-bodys">
          <div className="card-titles ">{movie.title}</div>
          <div>
            <span className="release-date "> {movie.release_date}</span>
          </div>
        </div>
        <div className="card-footers">
           {action(movie)}
        </div>
      </div>
      </div>
    </div>
  );
};

export default MovieCard;