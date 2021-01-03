import React, { useContext } from "react";
import {MoviesContext} from "../../contexts/moviesContext";
import {LoginContext} from '../../contexts/loginContext'

const AddToCollectionsButton  = ({ movie }) => {
        const context = useContext(MoviesContext);
        const Logcontext = useContext(LoginContext);
      
        const handleAddToCollections = e => {
          e.preventDefault();
          if(Logcontext.login===0){
            alert("please login first")
          }
          else{
            context.addToCollections(movie.id);
          }
        };
      
  return (
    <button
      type="button"
      className="btn w-100 btn-info alert-info"
      onClick={handleAddToCollections}>
      Add to Collections
    </button>
  );
};

export default AddToCollectionsButton;