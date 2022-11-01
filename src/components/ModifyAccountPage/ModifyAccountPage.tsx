import { Button, InputAdornment, OutlinedInput, TextField } from '@mui/material';
import GlassButtonComponent from 'components/User/GlassButton/GlassButton';
import WindowComponent from 'components/WindowComponent/WindowComponent';
import { ipcRenderer } from 'electron';
import React, { FC, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../MainPage/AddUser/AddUser.module.scss';

interface ModifyAccountPageProps {}

const ModifyAccountPage: FC<ModifyAccountPageProps> = () => {
  
  const [height, setHeight] = useState(170);
  const [weight, setWeight] = useState(80);
  const [age, setAge] = useState(20);
  const [username, setUsername] = useState("");
  const [usernameCriteria, setUsernameCriteria] = useState(true);

  const navigate = useNavigate();
  let userId = localStorage.getItem('userId') ?? 0;
  
  const handleChangeHeight = (event: React.ChangeEvent<HTMLInputElement>) => {
    var targetNumber = parseInt(event.target.value);
    if(targetNumber > 0 && targetNumber < 400)
    {
      setHeight(targetNumber);
    }
  }
  
  const handleChangeWeight = (event: React.ChangeEvent<HTMLInputElement>) => {
    var targetNumber = parseInt(event.target.value);
    if(targetNumber > 0 && targetNumber < 300)
    {
      setWeight(targetNumber);
    }
  }

  const handleChangeAge = (event: React.ChangeEvent<HTMLInputElement>) => {
    var targetNumber = parseInt(event.target.value);
    if(targetNumber > 0 && targetNumber < 200)
    {
      setAge(targetNumber);
    }
  }

  const handleChangeUsername = (e:React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
    if(e.target.value.length > 0 && e.target.value.length <= 14) setUsernameCriteria(true);
    else setUsernameCriteria(false);
  }

  const usernameCheck = (event:any) => {
    var regex = new RegExp("^[a-zA-Z0-9]+$");
    var key = String.fromCharCode(!event.charCode ? event.which : event.charCode);
    if (!regex.test(key)) {
       event.preventDefault();
       return false;
    }
  }

  function updateUserStats(){
    let user:User = {Username: username, Age: age, Weight: weight, Height: height, IconId: 0, PIN: 0, ID: +userId}
    ipcRenderer.send("updateUserStats", user);
    navigate("/SettingsMenu")
  }

  function deleteUserFromDatabase(){
    ipcRenderer.send("deleteAccount", userId);
    navigate('/');
  }

  useEffect(() => {
    ipcRenderer.send("returnUserInfo", userId);
    ipcRenderer.once("returnUser", (event, data:User) => {
      setUsername(data.Username);
      setWeight(data.Weight ?? 80);
      setHeight(data.Height ?? 170);
      setAge(data.Age ?? 20);
    })
  },[])

  return(
    <div className={styles.ModifyAccountPage}>
      <WindowComponent title={`Modify account`} height={"33rem"} padding={"2rem"}>
      
      <div className={styles.AddUser}>
        <div style={{display: 'flex'}}>
          <div className={styles.HelperText}>Username:</div>
          <TextField onKeyPress={usernameCheck} style={{width: '27rem'}} id="outlined-basic" label="Username" variant="outlined" onChange={handleChangeUsername} value={username}/>
        </div>

        <div style={{display: 'flex'}}>
          <div className={styles.HelperText}>Height:</div>
          <OutlinedInput
            id="outlined-number"
            type="number"
            value={height}
            onChange={handleChangeHeight}
            endAdornment={<InputAdornment position="end">cm</InputAdornment>}
            style={{width: '7rem'}}
            inputProps={{
              'aria-label': 'Height',
            }}
          />
          <Button variant="contained" color="error" onClick={() => setHeight(height >= 10 && height <= 400 ? height-10 : height)} style={{marginLeft: '1rem', fontSize: '1.3rem'}}> -10 </Button>
          <Button variant="contained" color="error" onClick={() => setHeight(height > 0 && height <= 400 ? height-1 : height)} style={{marginLeft: '1rem', fontSize: '1.3rem'}}> -1 </Button>
          <Button variant="contained" color="success" onClick={() => setHeight(height >= 0 && height < 400 ? height+1 : height)} style={{marginLeft: '1rem', fontSize: '1.3rem'}}> +1 </Button>
          <Button variant="contained" color="success" onClick={() => setHeight(height >= 0 && height <= 390 ? height+10 : height)} style={{marginLeft: '1rem', fontSize: '1.3rem'}}> +10 </Button>
        </div>
          
        <div style={{display: 'flex'}}>
          <div className={styles.HelperText}>Weight:</div>
          <OutlinedInput
            id="outlined-number"
            type="number"
            value={weight}
            onChange={handleChangeWeight}
            style={{width: '7rem'}}
            endAdornment={<InputAdornment position="end">kg</InputAdornment>}
            inputProps={{
              'aria-label': 'Height',
            }}
          />
          <Button variant="contained" color="error" onClick={() => setWeight(weight >= 10 && weight <= 300 ? weight-10 : weight)} style={{marginLeft: '1rem', fontSize: '1.3rem'}}> -10 </Button>
          <Button variant="contained" color="error" onClick={() => setWeight(weight > 0 && weight <= 300 ? weight-1 : weight)} style={{marginLeft: '1rem', fontSize: '1.3rem'}}> -1 </Button>
          <Button variant="contained" color="success" onClick={() => setWeight(weight >= 0 && weight < 300 ? weight+1 : weight)} style={{marginLeft: '1rem', fontSize: '1.3rem'}}> +1 </Button>
          <Button variant="contained" color="success" onClick={() => setWeight(weight >= 0 && weight <= 290 ? weight+10 : weight)} style={{marginLeft: '1rem', fontSize: '1.3rem'}}> +10 </Button>
        </div>

        <div style={{display: 'flex'}}>
          <div className={styles.HelperText}>Age:</div>
          <OutlinedInput
            id="outlined-number"
            type="number"
            value={age}
            onChange={handleChangeAge}
            style={{width: '4.5rem'}}
            inputProps={{
              'aria-label': 'Height',
            }}
          />
          <Button variant="contained" color="error" onClick={() => setAge(age >= 10 && age <= 200 ? age-10 : age)} style={{marginLeft: '1rem', fontSize: '1.3rem'}}> -10 </Button>
          <Button variant="contained" color="error" onClick={() => setAge(age > 0 && age <= 200 ? age-1 : age)} style={{marginLeft: '1rem', fontSize: '1.3rem'}}> -1 </Button>
          <Button variant="contained" color="success" onClick={() => setAge(age >= 0 && age < 200 ? age+1 : age)} style={{marginLeft: '1rem', fontSize: '1.3rem'}}> +1 </Button>
          <Button variant="contained" color="success" onClick={() => setAge(age >= 0 && age <= 190 ? age+10 : age)} style={{marginLeft: '1rem', fontSize: '1.3rem'}}> +10 </Button>
        </div>

        <div className={styles.ButtonSection}>
          <Button variant="contained" style={{fontSize: '1.3rem'}} color="secondary" onClick={() => navigate("/SettingsMenu")}>Return</Button>
          <Button variant="contained" style={{fontSize: '1.3rem'}} color="success" disabled={!usernameCriteria} onClick={updateUserStats}>Save</Button>
          <Button variant="contained" style={{fontSize: '1.3rem'}} color="error" onClick={deleteUserFromDatabase}>Delete account</Button>
        </div>

      </div>
      </WindowComponent>
    </div>
  );
}

export default ModifyAccountPage;
