import React ,{useContext,useState}from "react";
// import Button from '@material-ui/core/Button';
import { Link } from "react-router-dom";
import Button from "../components/pubilcOfLogin&Logout/button.js"
import LoginTitle from "../components/pubilcOfLogin&Logout/loginTitle.js"
import Input from "../components/pubilcOfLogin&Logout/input.js"
import Warn from "../components/pubilcOfLogin&Logout/warn.js"
import Li from "../components/pubilcOfLogin&Logout/li.js"
import Warp from "../components/pubilcOfLogin&Logout/warp.js"
import useForm from "react-hook-form"; 
import { Redirect } from "react-router-dom";
import { AuthContext } from '../contexts/authContext';

const Regist = props => {
  const context = useContext(AuthContext)
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [passwordAgain, setPasswordAgain] = useState("");
  const [registered, setRegistered] = useState(false);
  const [warning,setWarning]=useState({content:"" , state: false});

  const register = () => {
    var reg=/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{5,}$/;
    var result=reg.test(password);
    if (result && password.length > 0 && password === passwordAgain) {
      context.register(userName, password);
      setRegistered(true);
    }
    else if(password.length===0){
      setWarning({content:"Please enter password" , state: true});
    }
    else if(passwordAgain.length===0){
      setWarning({content:"Please enter password again" , state: true});
    }
    else if (!result){
      setWarning({content:"Password too short/no letter & symbol" , state: true});
    }
    else if(password !== passwordAgain){
      setWarning({content:"Entered passwords differ" , state: true});
    }
  }

  const warn = {
    display: warning.state? "block": "none"
  };

  const { from } = props.location.state || { from: { pathname: "/" } };

  if (registered === true) {
    return <Redirect to="./login" />;
  }
    return(
        <Warp>
        <div id="window">
        <LoginTitle>Regist</LoginTitle>
        <Warn className="warn" style={warn}>{warning.content}</Warn>
        <dl>
            <Li className="nav-item" id="usernameButton">
                <span>Username:</span> 
                <Input value={userName} placeholder="user name" onChange={e => {
        setUserName(e.target.value);
      }}></Input>
            </Li>
            <Li className="nav-item" id ="passwordButton">
                <span>Password:</span> 
                <Input value={password} type="password" placeholder="password" onChange={e => {
        setPassword(e.target.value);
      }}></Input>
            </Li>
            <Li className="nav-item" style={{marginBottom:35}} id="usernameButton">
                <span>Pw again:</span> 
                <Input value={passwordAgain} type="password" placeholder="password again" onChange={e => {
        setPasswordAgain(e.target.value);
      }}></Input>
            </Li>
            <Button onClick={register}>
                Regist
            </Button>
            <Link className="nav-link" to="/movies/login">
                login
            </Link>
        </dl>
        </div>
        </Warp>
    )
}

export default Regist;