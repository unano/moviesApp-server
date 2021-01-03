import React , {useState} from "react";
import SimilarMovieCard from "../similarMovieCard/";
import "./similarMovieList.css"
const SimilarMovieList = ({movies}) => {
  const [warn,setWarn]=useState();
  console.log(movies)
  return <>
    {movies ? (
  <div className="movies3">
    {movies.map(m => m.id?(<SimilarMovieCard key={m.id} movie={m} />): setWarn("No similar movies"))}
    <p>{warn}</p>
  </div>):(<p>No similar movie</p>)
    }
    </>
};

export default SimilarMovieList;