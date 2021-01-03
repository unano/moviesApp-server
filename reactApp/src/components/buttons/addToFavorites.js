import React, { useContext } from "react";
import {MoviesContext} from "../../contexts/moviesContext";
import {LoginContext} from '../../contexts/loginContext'

const AddToFavoriteButton = ({ movie }) => {
  const context = useContext(MoviesContext);
  const Logcontext = useContext(LoginContext);
  const handleAddToFavorite = e => {
    e.preventDefault();
    if(Logcontext.login===0){
      alert("please login first")
    }
    else{
      context.addToFavorites(movie.id);
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