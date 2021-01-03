import React ,{useState}from "react";
// import Button from '@material-ui/core/Button';
import { Link } from "react-router-dom";
import Button from "../pubilcOfLogin&Logout/button.js"
import LoginTitle from "../pubilcOfLogin&Logout/loginTitle.js"
import Input from "../pubilcOfLogin&Logout/input.js"
import Warn from "../pubilcOfLogin&Logout/warn.js"
import Li from "../pubilcOfLogin&Logout/li.js"
import Warp from "../pubilcOfLogin&Logout/warp.js"
import useForm from "react-hook-form"; 

const Regist = props => {
    const {handleSubmit,register} = useForm();
    const [warning,setWarning]=useState({content:"" , state: false});
    function judge(m){
        const user = JSON.parse(localStorage.getItem('user'));
        const username = user[0];
        for(let i = 0; i　< username.length; i++) {
            if(username[i]===m){
                 return false;
            }
            else if(i===username.length-1){
                return true;
            }
        }
    }


    const onSubmit= data =>{
        console.log(data)
        if(data.username==="" || data.password===""){
            setWarning({content:"Please enter username/password" , state: true});
        }
        else if(data.password.length<6){
            setWarning({content:"password too short(at least 6)" , state: true});
        }
        else if(judge(data.username) && data.password.length>=6){
            const Un=JSON.parse(localStorage.getItem('user'));
            Un[0].push(data.username);
            Un[1].push(data.password);
            localStorage.setItem('user',JSON.stringify(Un));
            alert("regist success")
            setWarning({content:"" , state: false})
        }
        
        else{setWarning({content:"Username is used" , state: true});}
    }


    const warn = {
        display: warning.state? "block": "none"
      };

    return(
        <Warp>
        <div id="window">
        <LoginTitle>Regist</LoginTitle>
        <Warn className="warn" style={warn}>{warning.content}</Warn>
        <form onSubmit={handleSubmit(onSubmit)}>
        <dl>
            <Li className="nav-item" id="usernameButton">
                <span>Username:</span> 
                <Input name="username" ref={register} required />
            </Li>
            <Li className="nav-item" style={{marginBottom:35}} id ="passwordButton">
                <span>Password:</span> 
                <Input name="password" ref={register} required />
            </Li>
            <Button type="submit">
                Regist
            </Button>
            <Link className="nav-link" to="/movies/login">
                login
            </Link>
        </dl>
        </form>
        </div>
        </Warp>
    )
}

export default Regist;