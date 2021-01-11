import React, { useContext } from "react";
import {MoviesContext} from "../../contexts/moviesContext";
import {AuthContext} from '../../contexts/authContext'

const AddToFavoriteButton = ({ movie }) => {
  const context = useContext(MoviesContext);
  const Logcontext = useContext(AuthContext);
  const handleAddToFavorite = e => {
    e.preventDefault();
    if(!Logcontext.isAuthenticated){
      alert("please login first")
    }
    else{
      context.addToFavorites(Logcontext.userName,movie.id);
    }
  };
  return (
    <button
      type="button"
      className="btn w-100 btn-info alert-info"
      onClick={handleAddToFavorite}
    >
      Add to Favorites
    </button>
  );
};

export default AddToFavoriteButton;