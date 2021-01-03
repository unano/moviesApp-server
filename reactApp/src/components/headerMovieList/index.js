import React from "react";
import "./headerMovieList.css"
const Header = ({ title, numMovies }) => {
  return (
    <div className="row">
      <div className="col-md-6">
        <div className="title">
          {`${title}  `}
          <span className="badge badge-pill badge-info">{numMovies}</span>
        </div>
      </div>
    </div>
  );
};

export default Header;