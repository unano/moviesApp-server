import React, { useContext } from "react";
import {MoviesContext} from "../../contexts/moviesContext";
import {AuthContext} from '../../contexts/authContext'

const AddToWatchListButton  = ({ movie }) => {
        const context = useContext(MoviesContext);
        const Logcontext = useContext(AuthContext);
      
        const handleAddToWatchLater = e => {
          if(!Logcontext.isAuthenticated){
            alert("please login first")
          }
          else{
          e.preventDefault();
          context.addToWatchList(Logcontext.userName,movie.id);
          
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