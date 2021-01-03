import React from "react";
import PersonCard from "../personCard";
import "./movieList.css";

const PersonList = ({person}) => {
  const personCards = person.map(m => (
    <PersonCard key={m.id} person={m} />
  ));
  return <div className="row person">{personCards}</div>;
};

export default PersonList;