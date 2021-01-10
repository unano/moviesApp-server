import React, {useContext} from "react";
import {AuthContext} from '../contexts/authContext';
import {PersonalContext} from '../contexts/personalContext'
import PersonalInfo from '../components/personalInfo';

const PersonalInfoPage = () => {
    const context = useContext(AuthContext)
    const userContext = useContext(PersonalContext);
    const user=userContext.user;
    userContext.setUserName(context.userName);
    // user.username=context.userName;
  return (
    <PersonalInfo user={user} userName={context.userName}/>
  );
};

export default PersonalInfoPage;
