import WindowComponent from 'components/WindowComponent/WindowComponent';
import GlassButtonComponent from 'components/User/GlassButton/GlassButton';
import React, { FC, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './TrainScreen.module.scss';
import RuleIcon from '@mui/icons-material/Rule';
import SingleGoal from 'components/SingleGoal/SingleGoal';
import { ipcRenderer } from 'electron';

interface TrainScreenProps {}

const getMITScale = (KMHAvg:number) => {
  if(KMHAvg < 10) return 3.5;
  else if(KMHAvg < 15.10) return 4.0;
  else if(KMHAvg < 19.15) return 6.8;
  else if(KMHAvg < 22.36) return 8.0;
  else if(KMHAvg < 25.58) return 10.0;
  else if(KMHAvg < 32.18) return 12.0;
  else return 15.8;
}

const TrainScreen: FC<TrainScreenProps> = () => {

  const [statKM, setStatKM] = useState(0);
  const [statTimeMin, setStatTimeMin] = useState(0);
  const [statTime, setStatTime] = useState("00:00:00");
  const [statCal, setStatCal] = useState(0);
  const [statAvgKM, setStatAvgKM] = useState(0);
  const [statKMH, setStatKMH] = useState(0);

  const [goalKMEnabled, setGoalKMEnabled] = useState(false);
  const [KMGoal, setKMGoal] = React.useState(15);
  const [goalTimeEnabled, setGoalTimeEnabled] = useState(false);
  const [timeGoal, setTimeGoal] = React.useState(30);
  const [goalCalEnabled, setGoalCalEnabled] = useState(false);
  const [calGoal, setCalGoal] = React.useState(300);

  const navigate = useNavigate();
  var userWeight:number = 100;
  let userId:number = +(localStorage.getItem('userId') ?? 0);

  function finishSession(){
    let userActivity:Activity = {
      UserID: userId,
      AvgSpeed: statAvgKM,
      CaloriesBurned: statCal,
      Date: Date.now() ,
      KilometersCycled: statKM,
      MinutesTrained: statTimeMin
    }
    ipcRenderer.send("addUserActivity", userActivity);
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

  function importUserStats() {
    ipcRenderer.send("returnUserInfo", userId);
    ipcRenderer.once("returnUser", (event, data:User) => {
      userWeight = data.Weight ?? 110;
    })
  }

  function startFetchingDataFromSerial(){
    ipcRenderer.send("StartTelemetryFetching");
    ipcRenderer.addListener("returnTelemetry", (event, data) => {
      //Data to chop "PRJW|KMH: 0|M: 0|KMA: 0.00|T: 0"
      let elements:string[] = data.split("|");
      //console.log("KMH:  0".split("KMH:")[1].trim());
      setStatKMH(parseFloat(elements[1].split("KMH:")[1].trim()));
      setStatKM(parseFloat(elements[2].split("M:")[1].trim())/1000);
      var tmpSpeedAverage = parseFloat(elements[3].split("KMA:")[1].trim())
      setStatAvgKM(tmpSpeedAverage);

      
      let timeInSeconds = parseInt(elements[4].split("T:")[1].trim());
      setStatTimeMin(timeInSeconds/60);
      
      let timeDate = new Date(0);
      timeDate.setSeconds(timeInSeconds);
      var timeString = timeDate.toISOString().substring(11, 19);
      setStatTime(timeString);

      let convertedTimeToHours = timeInSeconds/(60*60);
      let calcOverallCal = userWeight * getMITScale(tmpSpeedAverage) * convertedTimeToHours;
      //console.log(`${userWeight} * ${getMITScale(tmpSpeedAverage)}(${tmpSpeedAverage}) * ${convertedTimeToHours} = ${calcOverallCal}`)
      calcOverallCal = parseFloat(calcOverallCal.toFixed(2));
      setStatCal(calcOverallCal);
      //console.warn(data);
    })
  }

  useEffect(() => {
    if(userId === null) navigate('/');
    importGoals();
    importUserStats();
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
                <div className={styles.MiniStatBox_text}>KM/H:</div>
                <div className={styles.MiniStatBox_text2}>{statKMH}</div>
              </div>
              <div className={styles.MiniStatBox}>
                <div className={styles.MiniStatBox_text}>Avg KM/H:</div>
                <div className={styles.MiniStatBox_text2}>{statAvgKM}</div>
              </div>
            </div>
            <div className={styles.StatDivider}>
              <div className={styles.MiniStatBox} style={{width: '17rem'}}>
                <div className={styles.MiniStatBox_text}>Time passed:</div>
                <div className={styles.MiniStatBox_text2}>{statTime}</div>
              </div>
              <div className={styles.MiniStatBox} style={{width: '17rem'}}>
                <div className={styles.MiniStatBox_text}>Calories:</div>
                <div className={styles.MiniStatBox_text2}>{statCal}</div>
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
                {goalTimeEnabled ? <SingleGoal goalTitle={"Time cycled in minutes:"} goalMax={timeGoal} goalPercentage={statTimeMin} goalType={"Minutes"}/> : null}
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
