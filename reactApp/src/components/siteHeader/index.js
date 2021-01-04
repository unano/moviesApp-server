import React , {useContext} from "react";
import { Link } from "react-router-dom";
import "../../globals/fontawesome";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./siteHeader.css";
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { withRouter } from "react-router-dom";
import { AuthContext } from "../../contexts/authContext";

const SiteHeader = (props) => {
  const context = useContext(AuthContext);

  const loginBut = {
    display:context.isAuthenticated?"none" : "block"
  };

  const logoutBut = {

    display:context.isAuthenticated?"block" : "none"
  };

  const ValidateLogout=()=>{
    context.signout();
}
const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    if(context.isAuthenticated)
    setAnchorEl(event.currentTarget);
    else
    alert("please login first");
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const { history } = props;
  // context.isAuthenticated ? (
  //   <p>
  //   Welcome {context.userName}! <button onClick={() => context.signout()}>Sign out</button>
  // </p>
  // ) : (
  //   <p>
  //     You are not logged in{" "}
  //     <button onClick={() => history.push("/login")}>Login</button>
  //   </p>
  // );

  return (
    <nav className="navbar  navbar-light fixed-top" id="header">
      <nav className="navbar-brand text-white">
        <Link className="text-white" id="Tmdb" to="/">
           TMDB
        </Link>
      </nav>
      <FontAwesomeIcon
        className="navbar-text text-light"
        icon={["fas", "video"]}
        size="2x"
      />
      <nav className="navbar navbar-expand ">
        <ul className="navbar-nav">
          <li className="nav-item">
            <Link className="nav-link text-white" to="/">
              Home
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link text-white" to="/movies/upcoming">
              Upcoming
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link text-white" to="/movies/topRated">
              Top Rated
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link text-white" to="/person">
              Person
            </Link>
          </li>
          <div className="nav-item" aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
            <div className="nav-link text-white">Personal area</div>
          </div>
          <li>
          <Menu id="simple-menu" anchorEl={anchorEl} keepMounted open={Boolean(anchorEl)} onClose={handleClose}>
            <MenuItem onClick={handleClose}>
              <li className="nav-item">
                <Link className="nav-link text-info" to="/movies/favorites">
                  Favorites
                  </Link>
              </li>
            </MenuItem>
          <MenuItem onClick={handleClose}>
            <li className="nav-item">
              <Link className="nav-link text-info" to="/movies/watchList">
                Watch List
              </Link>
            </li>
          </MenuItem>
          <MenuItem onClick={handleClose}>
            <li className="nav-item">
              <Link className="nav-link text-info" to="/movies/collection">
                Collection
              </Link>
            </li>
            </MenuItem>
          <MenuItem onClick={handleClose}>
            <li className="nav-item">
              <Link className="nav-link text-info" to="/info">
                Personal Info
              </Link>
            </li>
            </MenuItem>
          </Menu>
          </li>
          <li className="nav-item" style={loginBut}>
            <Link className="nav-link text-white" to="/movies/login">
              Login
            </Link>
          </li>
          <li className="nav-item" style={logoutBut}>
          <div className="nav-link text-white" onClick={ValidateLogout}>
              Log out
          </div>
          </li>
        </ul>
      </nav>
    </nav>
  );
};

export default withRouter(SiteHeader);