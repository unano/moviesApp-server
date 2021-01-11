import React, { useContext } from "react";
import {MoviesContext} from "../../contexts/moviesContext";
import {AuthContext} from '../../contexts/authContext'

const AddToCollectionsButton  = ({ movie }) => {
        const context = useContext(MoviesContext);
        const Logcontext = useContext(AuthContext);
      
        const handleAddToCollections = e => {
          e.preventDefault();
          if(!Logcontext.isAuthenticated){
            alert("please login first")
          }
          else{
            context.addToCollections(Logcontext.userName,movie.id);
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