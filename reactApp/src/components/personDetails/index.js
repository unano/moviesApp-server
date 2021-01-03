import React from "react";
import "./personDetails.css";
import PersonMovieList from "../personMovieList"

export default ({person, movies}) => {
  return (
    <>
      <div className="content">
      <div className ="profile">
      <p><img  className="pic" src={person.profile_path
              ? `https://image.tmdb.org/t/p/w500/${person.profile_path}`
              : "./film-poster-placeholder.png" }
              alt={person.name}>
          </img>
      </p>
      <div className="basicProfile">
      <p className="subhead">Name</p>
      <p className="subheadInfo">{person.name}</p>
      <p className="subhead">Date of Birth</p>
      <p className="subheadInfo">{person.birthday}</p>
      <p className="subhead">Gender</p>
      <p className="subheadInfo">{person.gender===1?"female" :"male"}</p>
      <p className="subhead">Popularity</p>
      <p className="subheadInfo">{person.popularity}</p>
      <p className="subhead">birthplace</p>
      <p className="subheadInfo">{person.place_of_birth}</p>
      <p className="subhead">Known for</p>
      <p className="subheadInfo">{person.known_for_department}</p>
      <p className="subhead">Also knwon as</p>
      <p className="subheadInfo">{person.also_known_as.map((m)=><p className="subheadInfo">{m}</p>)}</p>
      <p className="subheadInfo">{}</p>
      </div>
      </div>
      <div className ="profile2">
      <p className="subhead" id="name">{person.name}</p>
      <p className="subheadInfo" id="biography">
      <p className="subhead" style={{fontSize:20}}>Personal profile</p>
      <p>{person.biography}</p>
      </p>
      <PersonMovieList movies={movies}/>
      </div>
      </div>
    </>
  );
};