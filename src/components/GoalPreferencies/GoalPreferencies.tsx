import { Checkbox, FormControlLabel, Slider } from '@mui/material';
import GlassButtonComponent from 'components/User/GlassButton/GlassButton';
import WindowComponent from 'components/WindowComponent/WindowComponent';
import { ipcRenderer } from 'electron';
import React, { FC, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './GoalPreferencies.module.scss';

interface GoalPreferenciesProps {}

const GoalPreferencies: FC<GoalPreferenciesProps> = () => {

  const [checkedKMGoal, setCheckedKMGoal] = React.useState(false);
  const [KMGoal, setKMGoal] = React.useState(15);
  const handleKMGoalChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCheckedKMGoal(event.target.checked);
  };
  const handleKMChange = (event: Event, newValue: number) => {
    setKMGoal(newValue);
  };

  const [checkedTimeGoal, setCheckedTimeGoal] = React.useState(false);
  const [timeGoal, setTimeGoal] = React.useState(30);
  const handleTimeGoalChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCheckedTimeGoal(event.target.checked);
  };
  const handleTimeChange = (event: Event, newValue: number) => {
    setTimeGoal(newValue);
  };

  const [checkedCalGoal, setCheckedCalGoal] = React.useState(false);
  const [calGoal, setCalGoal] = React.useState(300);
  const handleCalGoalChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCheckedCalGoal(event.target.checked);
  };
  const handleCalChange = (event: Event, newValue: number) => {
    setCalGoal(newValue);
  };


  let userId = localStorage.getItem('userId') ?? 0;
  const navigate = useNavigate();

  function fetchGoals(){
    ipcRenderer.send("returnUserGoals", userId);
    ipcRenderer.once("returnGoals", (event, data:Goals) => {
      setCheckedKMGoal(data.KMGoal);
      if(data.KMGoal) setKMGoal(data.KMLimit ?? 0);
      setCheckedTimeGoal(data.TimeGoal);
      if(data.TimeGoal) setTimeGoal(data.TimeLimitMinutes ?? 0);
      setCheckedCalGoal(data.CaloriesGoal);
      if(data.CaloriesGoal) setCalGoal(data.CaloriesLimit ?? 0);
    })
  }

  function saveGoalsAndReturn(){
    
    var userGoals:Goals = {
      UserId: +userId,
      KMGoal: checkedKMGoal,
      KMLimit: checkedKMGoal ? KMGoal : -1,
      TimeGoal: checkedTimeGoal,
      TimeLimitMinutes: checkedTimeGoal ? timeGoal : -1,
      CaloriesGoal: checkedCalGoal,
      CaloriesLimit: checkedCalGoal ? calGoal : -1
    };
    
    ipcRenderer.send("setUserGoals", userGoals);
    navigate("/SettingsMenu");
  }

  useEffect(() => {
    if(userId === null) navigate('/');
    fetchGoals();
  }, [])

  return (
    <div>
      <WindowComponent title={`Set goals`} height={"33rem"} padding={"2rem"}>
        <div className={styles.CategoryBox}>
          <div style={{display: 'flex', height: '40px'}}>
            <h3 style={{alignSelf: 'center'}}>Set kilometer goal:</h3>
            <Checkbox
              checked={checkedKMGoal}
              onChange={handleKMGoalChange}
              inputProps={{ 'aria-label': 'controlled' }}
            />
          </div>
          <Slider 
            aria-label="Default" 
            valueLabelDisplay="auto" 
            value={KMGoal}
            onChange={handleKMChange}
            step={5}
            marks 
            min={5} 
            max={60}
            disabled={!checkedKMGoal}
          />
        </div>

        <div className={styles.CategoryBox}>
          <div style={{display: 'flex', height: '40px'}}>
            <h3 style={{alignSelf: 'center'}}>Set time goal (in minutes):</h3>
            <Checkbox
              checked={checkedTimeGoal}
              onChange={handleTimeGoalChange}
              inputProps={{ 'aria-label': 'controlled' }}
            />
          </div>
          <Slider 
            value={timeGoal}
            onChange={handleTimeChange}
            aria-label="Default" 
            valueLabelDisplay="auto" 
            step={10}
            marks 
            min={10} 
            max={180}
            disabled={!checkedTimeGoal}
          />
        </div>

        <div className={styles.CategoryBox}>
          <div style={{display: 'flex', height: '40px'}}>
            <h3 style={{alignSelf: 'center'}}>Set calories goal:</h3>
            <Checkbox
              checked={checkedCalGoal}
              onChange={handleCalGoalChange}
              inputProps={{ 'aria-label': 'controlled' }}
            />
          </div>
          <Slider 
            value={calGoal}
            onChange={handleCalChange}
            aria-label="Default" 
            valueLabelDisplay="auto" 
            step={50}
            marks 
            min={50} 
            max={2000}
            disabled={!checkedCalGoal}
          />
        </div>

        <div style={{display: 'flex', justifyContent: 'space-between'}}>
          <GlassButtonComponent v2 text='Return' iconPreset={4} eventClick={() => navigate("/SettingsMenu")} />
          <GlassButtonComponent v2 text='Save settings' iconPreset={7} eventClick={saveGoalsAndReturn} />
        </div>
      </WindowComponent>
    </div>
  );
}
export default GoalPreferencies;
