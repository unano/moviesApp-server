import React, {createContext, useState, useEffect} from "react";
import { getInfo, editInfo } from "../api/movie-api";

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
    const[user,setUser] = useState("");
    const [userName, setUserName] = useState("");

    const edit = async (info) => {
        const result = await editInfo(userName,info);
        console.log(result.code);
        return (result.code == 201) ? true : false;
      };

    useEffect(() => {
        getInfo(userName).then(user => {
          setUser(user);
        });
      },[userName]);

    return (
        <PersonalContext.Provider
          value={{
            user:user,
            setUser:setUser,
            setUserName:setUserName,
            edit:edit
        }}
        >
            {props.children}
        </PersonalContext.Provider>    
    )
}
export default PersonalContextProvider;