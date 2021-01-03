import React from "react";
import PersonMovieCard from "../personMovieCard";
import "./movieList.css";
import PersonMovieListAll from "../personMovieListAll";
const PersonMovieList = ({movies}) => {
  var PopularMovies=[];
  var HighScoreMovies=[];
  var AllMovies=[];
  PopularMovies = JSON.parse(JSON.stringify(movies));
  HighScoreMovies = JSON.parse(JSON.stringify(movies));
  AllMovies = JSON.parse(JSON.stringify(movies));
  const PopularMovie= PopularMovies? PopularMovies.sort((m, n) =>{
    if (m.popularity < n.popularity) return 1
    else if (m.popularity > n.popularity) return -1
    else return 0 
   }):"";

   const HighScoreMovie= HighScoreMovies? HighScoreMovies.sort((m, n) =>{
    if (m.vote_average < n.vote_average) return 1
    else if (m.vote_average > n.vote_average) return -1
    else return 0
   }):"";

   const AllMovie= AllMovies? AllMovies.sort((m, n) =>{
    if (m.release_date < n.release_date) return 1
    else if (m.release_date > n.release_date) return -1
    else return 0
   }):"";
  return <>
  {movies ? (
    <><p className="subhead" style={{fontSize:20, marginTop:10}}>Popular movies</p>
    <div className="movies2">{PopularMovie.slice(0,10).map(m => (
      <PersonMovieCard key={m.id} movie={m} property={m.popularity}  property2="popularity:"/>
    ))}</div>
    <p className="subhead" style={{fontSize:20, marginTop:10}}>High score movies</p>
    <div className="movies2">{HighScoreMovie.slice(0,10).map(m => (
      <PersonMovieCard key={m.id} movie={m} property={m.vote_average} property2="mark:"/>
    ))}</div>
    <p className="subhead" style={{fontSize:20, marginTop:10}}>All performing movies</p>
    <div className="AllPerformingMovies">{AllMovie.map(m => (
      <PersonMovieListAll key={m.id} movie={m} />
    ))}</div>
    
    </>
    ): (
      <p>Waiting for movie details</p>
    )}
  </>
};

export default PersonMovieList;
