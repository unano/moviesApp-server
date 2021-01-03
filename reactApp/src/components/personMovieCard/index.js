import React from "react";
import { Link } from "react-router-dom";
import "./movieCard.css";
import "../../globals/fontawesome";

const PersonMovieCard = ({movie,property,property2}) => {
  return (
    <div className="">
      <div className="personMovie">
      <div className="personMovieCard">
      <Link to={`/movies/${movie.id}`}>
        <img
          className="card-img-tag center " id="movpic"
          alt=""
          src={
            movie.poster_path
              ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}`
              : "./film-poster-placeholder.png"
          }
        />
        </Link>
      <p className="subheadInfo" id="title">{movie.title}</p>
      <p className="subheadInfo"style={{color:"darkturquoise"}}>{property2}{" "}{Math.round(property*10)/10}</p>
      </div>
      </div>
    </div>
  );
};

export default PersonMovieCard;