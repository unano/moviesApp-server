import React, { useContext } from "react";
import {MoviesContext} from "../../contexts/moviesContext";

const RemoveFromWatchListButton   = ({ movie }) => {
        const context = useContext(MoviesContext);
      
        const handleRemoveFromWatchList = e => {
          e.preventDefault();
          context.removeFromWatchList(movie.id);
        };
      
  return (
    <button
      type="button"
      className="btn w-100 btn-info alert-info"
      onClick={handleRemoveFromWatchList}>
      remove from watch list
    </button>
  );
};

export default RemoveFromWatchListButton;