import React, {createContext,useReducer, useState} from "react";

export const LoginContext = createContext(null);

const reducer=(state, action)=> {
    switch (action.type) {
      case 'logged':
        return {login: 1};
      case 'unlogged':
        return {login: 0};
      default:
        throw new Error();
    }
  }
  let user=[["administrator"],["123456"]]
  localStorage.setItem('user',JSON.stringify(user));
  
const LoginContextProvider=(props)=>{
    const[state, dispatch] = useReducer(reducer, {login: 0});
    const[username,setUsername] = useState();
    const changeStateToLogged=()=>{
        dispatch({type: 'logged'})
    }
    const changeStateToUnLogged=()=>{
        dispatch({type: 'unlogged'})
    }

    return (
        <LoginContext.Provider
          value={{
            login:state.login,
            username:username,
            setUsername:setUsername,
            changeStateToLogged:changeStateToLogged,
            changeStateToUnLogged:changeStateToUnLogged,
        }}
        >
            {props.children}
        </LoginContext.Provider>    
    )
}
export default LoginContextProvider;