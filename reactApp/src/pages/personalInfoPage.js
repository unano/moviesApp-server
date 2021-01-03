import React, {useContext} from "react";
import {LoginContext} from '../contexts/loginContext';
import {PersonalContext} from '../contexts/personalContext'
import PersonalInfo from '../components/personalInfo';

const PersonalInfoPage = () => {
    const loginContext = useContext(LoginContext);
    const userContext = useContext(PersonalContext);
    const user=userContext.user;
    user.username=loginContext.username;
  return (
    <PersonalInfo user={user}/>
  );
};

export default PersonalInfoPage;
