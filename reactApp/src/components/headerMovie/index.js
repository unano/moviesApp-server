import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { withRouter } from "react-router-dom";
import "./headerMovie.css"
const MovieHeader = ({ movie, history }) => {
  return (
    <div className="row">
             <div className="col-2">
          <button id="button1" onClick={() => history.goBack()}>
            <FontAwesomeIcon icon={["fas", "arrow-circle-left"]} size="2x" />
            <span>{" Back"}</span>
          </button>
        </div>
      <div className="col-6 offset-3">
        <div id="titles">
          {movie.title}
          {"  "}
          <a href={movie.homepage}>
            <FontAwesomeIcon icon={["fas", "home"]} size="1x" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default withRouter( MovieHeader );