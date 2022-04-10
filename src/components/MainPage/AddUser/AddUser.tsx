import { Button, IconButton, InputAdornment, OutlinedInput, TextField } from '@mui/material';
import React, { FC, useState } from 'react';
import styles from './AddUser.module.scss';

interface AddUserProps {
  ReturnToSelection:any;
}

const AddUser: FC<AddUserProps> = (props) => {
  
  const [height, setHeight] = useState(170);
  const [weight, setWeight] = useState(80);
  const [age, setAge] = useState(20);

  
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


  return (
    <div className={styles.AddUser}>
      
      <div style={{display: 'flex'}}>
        <div className={styles.HelperText}>Please enter a username:</div>
        <TextField style={{width: '27rem'}} id="outlined-basic" label="Username" variant="outlined" />
      </div>
      
      <div style={{display: 'flex'}}>
        <div className={styles.HelperText}>Please enter your height:</div>
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
        <div className={styles.HelperText}>Please enter your weight:</div>
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
        <div className={styles.HelperText}>Please enter your age:</div>
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
        <Button variant="contained" style={{fontSize: '1.3rem'}} color="secondary" onClick={props.ReturnToSelection}>Return to user selection</Button>
        <Button variant="contained" style={{fontSize: '1.3rem'}} color="success">Create user</Button>
      </div>

    </div>
  );
}

export default AddUser;
