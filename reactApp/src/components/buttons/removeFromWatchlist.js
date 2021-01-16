import React, { useContext } from "react";
import {MoviesContext} from "../../contexts/moviesContext";
import {AuthContext} from '../../contexts/authContext'

const RemoveFromWatchListButton   = ({ movie }) => {
        const context = useContext(MoviesContext);
        const Logcontext = useContext(AuthContext);
      
        const handleRemoveFromWatchList = e => {
          e.preventDefault();
          context.removeFromWatchList(Logcontext.userName,movie.id);
      }

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