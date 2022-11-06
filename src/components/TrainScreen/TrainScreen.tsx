import WindowComponent from 'components/WindowComponent/WindowComponent';
import GlassButtonComponent from 'components/User/GlassButton/GlassButton';
import React, { FC, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './TrainScreen.module.scss';
import RuleIcon from '@mui/icons-material/Rule';
import SingleGoal from 'components/SingleGoal/SingleGoal';
import { ipcRenderer } from 'electron';

interface TrainScreenProps {}

const TrainScreen: FC<TrainScreenProps> = () => {

  const [statKM, setStatKM] = useState(0);
  const [statTime, setStatTime] = useState(0);
  const [statCal, setStatCal] = useState(0);
  const [statAvgKM, setStatAvgKM] = useState(0);

  const [goalKMEnabled, setGoalKMEnabled] = useState(false);
  const [KMGoal, setKMGoal] = React.useState(15);
  const [goalTimeEnabled, setGoalTimeEnabled] = useState(false);
  const [timeGoal, setTimeGoal] = React.useState(30);
  const [goalCalEnabled, setGoalCalEnabled] = useState(false);
  const [calGoal, setCalGoal] = React.useState(300);

  const navigate = useNavigate();
  var notLongerInWindow:boolean = false;
  let userId = localStorage.getItem('userId');

  function finishSession(){
    notLongerInWindow = true;
    ipcRenderer.removeAllListeners("returnTelemetry");
    ipcRenderer.send("StopTelemetryFetching");
    navigate('/PreviousSessions');
  }

  function importGoals(){
    ipcRenderer.send("returnUserGoals", userId);
    ipcRenderer.once("returnGoals", (event, data:Goals) => {
      setGoalKMEnabled(data.KMGoal);
      if(data.KMGoal) setKMGoal(data.KMLimit ?? 0);
      setGoalTimeEnabled(data.TimeGoal);
      if(data.TimeGoal) setTimeGoal(data.TimeLimitMinutes ?? 0);
      setGoalCalEnabled(data.CaloriesGoal);
      if(data.CaloriesGoal) setCalGoal(data.CaloriesLimit ?? 0);
    })
  }

  function startFetchingDataFromSerial(){
    ipcRenderer.send("StartTelemetryFetching");
    ipcRenderer.addListener("returnTelemetry", (event, data) => {
      console.warn(data);
    })
  }

  useEffect(() => {
    if(userId === null) navigate('/');
    importGoals();
    startFetchingDataFromSerial();
  }, [])
  
  return (
    <div>
      <WindowComponent title={``} height={"33rem"} padding={"2rem"}>
        <div className={styles.InsideWindow}>
          <div className={styles.BoxStats}>
            <div className={styles.BoxTitleStats}>
              <div className={styles.BoxTitleStats_text}>Statistics:</div>
            </div>
            <div className={styles.StatDivider}>
              <div className={styles.MiniStatBox}>
                <div className={styles.MiniStatBox_text}>KM:</div>
                <div className={styles.MiniStatBox_text2}>{statKM}</div>
              </div>
              <div className={styles.MiniStatBox}>
                <div className={styles.MiniStatBox_text}>Time passed:</div>
                <div className={styles.MiniStatBox_text2}>{statTime}</div>
              </div>
            </div>
            <div className={styles.StatDivider}>
              <div className={styles.MiniStatBox}>
                <div className={styles.MiniStatBox_text}>Calories:</div>
                <div className={styles.MiniStatBox_text2}>{statCal}</div>
              </div>
              <div className={styles.MiniStatBox}>
                <div className={styles.MiniStatBox_text}>Avg KM/H:</div>
                <div className={styles.MiniStatBox_text2}>{statAvgKM}</div>
              </div>
            </div>
          </div>
          <div className={styles.BoxGoals}>
            <div className={styles.BoxTitleStats}>
              <div className={styles.BoxTitleStats_text}>Goals:</div>
            </div>
            {
              !goalTimeEnabled && !goalKMEnabled && !goalCalEnabled ?
              <div className={styles.NoGoalsWindow}>
                <RuleIcon style={{fontSize: '50px'}}/>
                <div>Enable goals in user preferences.</div>
              </div>
              :
              <>
                {goalKMEnabled ? <SingleGoal goalTitle={"Kilometers cycled:"} goalMax={KMGoal} goalPercentage={statKM} goalType={"KM"}/> : null}
                {goalTimeEnabled ? <SingleGoal goalTitle={"Time cycled in minutes:"} goalMax={timeGoal} goalPercentage={statTime} goalType={"Minutes"}/> : null}
                {goalCalEnabled ? <SingleGoal goalTitle={"Calories burned:"} goalMax={calGoal} goalPercentage={statCal} goalType={"Calories"}/> : null}
              </>
            }
          </div>
        </div>
        <div style={{position: 'fixed', right: '7.5rem', bottom: '11.7rem'}}>
          <GlassButtonComponent v2 text='Finish session' iconPreset={8} eventClick={finishSession} />
        </div>
      </WindowComponent>
    </div>
  );
}
export default TrainScreen;
