import React, {useContext} from "react";
import PersonalInfoEdit from '../components/personalInfoEdit'
import {PersonalContext} from '../contexts/personalContext'

const PersonalInfoEditPage = ({history}) => {
    const context = useContext(PersonalContext);
    const user =context.user;
  return (
      <PersonalInfoEdit  history={history} userInfo={user}/>
  );
};

export default PersonalInfoEditPage;