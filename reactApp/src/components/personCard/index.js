import React from "react";
import { Link } from "react-router-dom";
import "./personCard.css";
import "../../globals/fontawesome";

const PersonCard = ({person}) => {
  return (
    <div className="col-sm-2" id="col-sm-2-person">
      <div className="personCardOutside">
      <div className="card">
      <Link to={`/person/${person.id}`}>
        <img
          className="card-img-tag center " id="person"
          alt={person.name}
          src={
            person.profile_path
              ? `https://image.tmdb.org/t/p/w500/${person.profile_path}`
              : "./film-poster-placeholder.png"
          }
        />
      </Link>
        <div className="personCard-bodys">
          <div className="card-titles ">{person.name}</div>
          <div>
            <span className="card-word " style={{fontSize: 12}}> Popularity: {person.popularity}</span>
          </div>
          <div>
            <div className="known-for"> known for:  {" "+person.known_for.map(m=>{return m.title})}</div>
          </div>
        </div>
      </div>
      </div>
    </div>
  );
};

export default PersonCard;