import React ,{useState, useContext}from "react";
import { Link } from "react-router-dom";
import { Redirect } from "react-router-dom";
import { AuthContext } from '../contexts/authContext';
import Button from "../components/pubilcOfLogin&Logout/button.js"
import LoginTitle from "../components/pubilcOfLogin&Logout/loginTitle.js"
import Input from "../components/pubilcOfLogin&Logout/input.js"
import Warn from "../components/pubilcOfLogin&Logout/warn.js"
import Li from "../components/pubilcOfLogin&Logout/li.js"
import Warp from "../components/pubilcOfLogin&Logout/warp.js"


const Login = props => {
    const context = useContext(AuthContext)
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");

    const login = () => {
        context.authenticate(userName, password);
      };
    
      // Set 'from' to path where browser is redirected after a successful login.
      // Either / or the protected path user tried to access.
      const { from } = { from: { pathname: "/" } };
      console.log(context)
      if (context.isAuthenticated === true) {
        return <Redirect to={from} />;
      }
    return(
        <Warp>
        <div id="window">
        <LoginTitle>login</LoginTitle>
        {/* <Warn className="warn" style={warn}>{warning.content}</Warn> */}
        {/* <form onSubmit={handleSubmit(onSubmit)}> */}
        <dl>
            <Li className="nav-item" id="usernameButton">
                <span>Username:</span> 
                <Input id="username" placeholder="user name" onChange={e => {
        setUserName(e.target.value);
      }}></Input>
            </Li>
            <Li className="nav-item" style={{marginBottom:35}}  id ="passwordButton">
                <span>Password:</span>
                <Input id="password" type="password" placeholder="password" onChange={e => {
        setPassword(e.target.value);
      }}></Input>
            </Li>
            <Button id="Login" onClick={login}>
                Login
            </Button>
            <Link className="nav-link" to="/movies/regist">
                regist
            </Link>
        </dl>
        </div>
        </Warp>
    )
}

export default Login;