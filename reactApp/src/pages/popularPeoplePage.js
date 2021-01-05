import React, { useState, useEffect } from "react";
import { getPopularPeople} from "../api/movie-api";
import PersonList from "../components/personList"
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import TextField from '@material-ui/core/TextField';

const PopularPeoplePage = () => {
    const [person, setPerson] = useState([]);
    const [buttonValue, setButtonValue] = React.useState('0');
    const [inputValue, setInputValue] = React.useState('');
    useEffect(() => {
        getPopularPeople().then(person => {
            setPerson(person);
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
      }, []);
      
        const handleButtonChange = (e) => {
            setButtonValue(e.target.value);
        };
        const handleTextChange =(e) => {
            setInputValue(e.target.value);
        }
    let displayedPerson = person.filter((m) => {
        return (buttonValue==="0")?(
             m.name.toLowerCase().indexOf(inputValue.toLowerCase())!==-1
        )
        :(m.gender===parseInt(buttonValue) && m.name.toLowerCase().indexOf(inputValue.toLowerCase())!==-1);
    })
    return (
        <>
        <div className="title">Popular person</div>
        <div style={{marginBottom:40 ,boxShadow:2}}>
        <div style={{float: "left", marginTop:16, marginRight:20 ,fontSize:20}}>Filter:</div>
        <TextField style={{float: "left"}} id="standard-basic" label="Name" value={inputValue} onChange={handleTextChange}/>
        <RadioGroup style={{float: "left" , marginTop:12 ,marginLeft:20}} 
            class="form-horizontal" aria-label="gender" name="gender1" value={buttonValue} onChange={handleButtonChange}>
        <FormControlLabel value="1" control={<Radio color="default"/>} label="Female" />
        <FormControlLabel value="2" control={<Radio color="default"/>} label="Male" />
        <FormControlLabel value="0" control={<Radio color="default"/>} label="All" />
        </RadioGroup>
        <br/>
        </div>
          <PersonList
           person={displayedPerson}
        />
        </>
    )
}

export default PopularPeoplePage;