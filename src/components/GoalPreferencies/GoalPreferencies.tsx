import { ipcRenderer } from 'electron';
import React, { FC, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './GoalPreferencies.module.scss';

interface GoalPreferenciesProps {}

const GoalPreferencies: FC<GoalPreferenciesProps> = () => {
  
  const [userGoals, setUserGoals] = useState<Goals>();

  let userId = localStorage.getItem('userId');
  const navigate = useNavigate();

  function fetchGoals(){
    ipcRenderer.send("returnUserGoals", userId);
    ipcRenderer.once("returnGoals", (event, data:Goals) => {
      setUserGoals(data);
    })
  }

  useEffect(() => {
    if(userId === null) navigate('/');
    fetchGoals();
  }, [])

  return (
    <div className={styles.GoalPreferencies}>
      <a onClick={() => navigate("/SettingsMenu")}>Click here to go back</a>
    </div>
  );
}
export default GoalPreferencies;
