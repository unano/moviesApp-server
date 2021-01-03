import React from "react";
import { Link } from "react-router-dom";
import "./movieCard.css";
import "../../globals/fontawesome";

const PersonMovieCard = ({movie}) => {
  return (
    <div className="infos">
      <p className="subheadInfo" style={{color:"black", fontSize:15}}>
        <span class="date">{movie.release_date? movie.release_date.substring(0,4) : "——"}</span>
        <Link  className="link" to={`/movies/${movie.id}`}>
        <span class="name2">{movie.title}</span>
        </Link>
      </p>
    </div>
  );
};

export default PersonMovieCard;