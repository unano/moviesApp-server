import React from "react";
import { withRouter } from "react-router-dom";
import PersonDetails from "../components/personDetails";
import UsePerson from "../hooks/usePerson";
import UsePersonMovie from "../hooks/usePersonMovie";

const PeoplePage = props => {
  const { id } = props.match.params;
  const [person] = UsePerson(id);
  const [movies] = UsePersonMovie(id);
  return (
    <>
    {person ? (
      <>
    <PersonDetails person={person} movies={movies}/>
      </>): (
    <p>Waiting for person details</p>
  )}
  </>
  );
};

export default withRouter(PeoplePage);