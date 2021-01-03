import React, {createContext, useState} from "react";

export const PersonalContext = createContext(null);
  
const PersonalContextProvider=(props)=>{
    const userInfo={
        username:"",
        gender:"No record",
        birthday:"2000-01-01",
        hobby:"No record",
        movies:"No record",
        actors:"No record",
        introduce:"No record",
    }
    const[user,setUser] = useState(userInfo);

    return (
        <PersonalContext.Provider
          value={{
            user:user,
            setUser:setUser
        }}
        >
            {props.children}
        </PersonalContext.Provider>    
    )
}
export default PersonalContextProvider;