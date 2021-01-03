import React, {useContext, useState} from "react";
import "../../globals/fontawesome";
import useForm from "react-hook-form";
import {PersonalContext} from '../../contexts/personalContext'
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import TextField from '@material-ui/core/TextField';
import FormLabel from '@material-ui/core/FormLabel';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import"./psInfoEdit.css";

const PersonalInfoEdit = ({history, userInfo}) => {
    const {handleSubmit} = useForm();
    const context = useContext(PersonalContext);
    const [user,setUser]=useState(userInfo);
    console.log(user)

    const useStyles = makeStyles((theme) => ({
        container: {
          display: 'flex',
          flexWrap: 'wrap',
        },
        textField: {
          marginLeft: theme.spacing(1),
          marginRight: theme.spacing(1),
          width: 200,
        },
      }));
    const classes = useStyles();

    function handleChange({target}){
      setUser(user => ({...user, [target.name]: target.value}))
    }
    
    function onSubmit(formData){
        context.setUser(user);
        console.log(formData);
        history.push("/info");
  };

  return (
      <div className="content2">
      <div className="form-group">
    <form className="form" autoComplete="off" onSubmit={handleSubmit(onSubmit)}>

       <p style={{fontSize:20}}>Username: {userInfo.username}</p>
      <FormLabel style={{float: "left", fontSize:12, color:"grey"}}>Gender</FormLabel>
      <RadioGroup style={{float: "left"}}
       class="form-horizontal" aria-label="gender" name="gender" value={user.gender} onChange={handleChange}>
        <FormControlLabel value="female" control={<Radio color="default"/>} label="Female" />
        <FormControlLabel value="male" control={<Radio color="default"/>} label="Male" />
       </RadioGroup>
        <TextField
          name="birthday"
          style={{marginBottom:20}}
          id="date"
          label="birthday"
          type="date"
          value={user.birthday}
          defaultValue={userInfo.birthday}
          className={classes.textField}
          onChange={handleChange}
        />
        <br/>
        <br/>
        <TextField
          name="hobby"
          id="outlined-multiline-static"
          style={{width: 455, marginBottom:14}}
          label="hobby"
          multiline
          rows={1}
          value={user.hobby}
          defaultValue={userInfo.hobby}
          onChange={handleChange}
          variant="outlined"
        />
        <br/>
        <TextField
          name="movies"
          id="outlined-multiline-static"
          style={{width: 455, marginBottom:14}}
          label="favorite movie"
          multiline
          rows={1}
          value={user.movies}
          defaultValue={userInfo.movies}
          onChange={handleChange}
          variant="outlined"
        />
        <br/>
        <TextField
          name="actors"
          id="outlined-multiline-static"
          style={{width: 455, marginBottom:14}}
          label="favorite actor"
          multiline
          rows={1}
          value={user.actors}
          defaultValue={userInfo.actors}
          onChange={handleChange}
          variant="outlined"
        />
        <br/>
        <TextField
          name="introduce"
          id="outlined-multiline-static"
          style={{width: 455, marginBottom:14}}
          label="Personal introduction"
          multiline
          rows={3}
          value={user.introduce}
          defaultValue={userInfo.introduce}
          onChange={handleChange}
          variant="outlined"
        />
        <Button variant="contained" style={{float: "right"}} onClick={() => history.goBack()}>Back</Button>
        <Button variant="contained" type="submit" color="primary" 
        style={{float: "right" ,marginRight:10, backgroundColor: "darkturquoise"}}>
        Update
        </Button>
    </form>
    </div>
      </div>
  );
};

export default PersonalInfoEdit;