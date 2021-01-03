import React , {useContext} from "react";
import { Link } from "react-router-dom";
import "../../globals/fontawesome";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./siteHeader.css";
import {LoginContext} from '../../contexts/loginContext'
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { withRouter } from "react-router-dom";
// import { AuthContext } from "../../contexts/authContext";

const SiteHeader = (props) => {
  const Logcontext = useContext(LoginContext);
  if(Logcontext.login===1){
  }
  const loginBut = {
    display:Logcontext.login===1?"none" : "block"
  };

  const logoutBut = {

    display:Logcontext.login===0?"none" : "block"
  };

  const ValidateLogout=()=>{
    Logcontext.changeStateToUnLogged();
}
const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    if(Logcontext.login===1)
    setAnchorEl(event.currentTarget);
    else
    alert("please login first");
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  // const context = useContext(AuthContext);
  const { history } = props;

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
        {/* context.isAuthenticated ? (
    <p>
    Welcome {context.userName}! <button onClick={() => context.signout()}>Sign out</button>
  </p>
  ) : (
    <p>
      You are not logged in{" "}
      <button onClick={() => history.push("/login")}>Login</button>
    </p>
  ); */}
      </nav>
    </nav>
  );
};

export default withRouter(SiteHeader);