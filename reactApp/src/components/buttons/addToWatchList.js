import React, { useContext } from "react";
import {MoviesContext} from "../../contexts/moviesContext";
import {LoginContext} from '../../contexts/loginContext'

const AddToWatchListButton  = ({ movie }) => {
        const context = useContext(MoviesContext);
        const Logcontext = useContext(LoginContext);
      
        const handleAddToWatchLater = e => {
          if(Logcontext.login===0){
            alert("please login first")
          }
          else{
          e.preventDefault();
          context.addToWatchList(movie.id);
          }
        };
      
  return (
    <button
      type="button"
      className="btn w-100 btn-info alert-info"
      onClick={handleAddToWatchLater}>
      Add to watch list
    </button>
  );
};

export default AddToWatchListButton;