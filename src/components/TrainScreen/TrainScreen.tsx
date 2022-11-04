import WindowComponent from 'components/WindowComponent/WindowComponent';
import GlassButtonComponent from 'components/User/GlassButton/GlassButton';
import React, { FC, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './TrainScreen.module.scss';
import RuleIcon from '@mui/icons-material/Rule';
import SingleGoal from 'components/SingleGoal/SingleGoal';

interface TrainScreenProps {}

const TrainScreen: FC<TrainScreenProps> = () => {

  const [statKM, setStatKM] = useState("141");
  const [statTime, setStatTime] = useState("1:05:42");
  const [statCal, setStatCal] = useState("456");
  const [statAvgKM, setStatAvgKM] = useState("16");

  const [goalKMEnabled, setGoalKMEnabled] = useState(true);
  const [goalTimeEnabled, setGoalTimeEnabled] = useState(true);
  const [goalCalEnabled, setGoalCalEnabled] = useState(true);


  const navigate = useNavigate();
  let userId = localStorage.getItem('userId');

  function finishSession(){
    navigate('/PreviousSessions');
  }

  useEffect(() => {
    if(userId === null) navigate('/');
    //getUser();
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
                {goalKMEnabled ? <SingleGoal goalTitle={"Kilometers cycled:"} goalMax={80} goalPercentage={70} goalType={"KM"}/> : null}
                {goalTimeEnabled ? <SingleGoal goalTitle={"Time cycled in minutes:"} goalMax={90} goalPercentage={78} goalType={"Minutes"}/> : null}
                {goalCalEnabled ? <SingleGoal goalTitle={"Calories burned:"} goalMax={800} goalPercentage={632} goalType={"Calories"}/> : null}
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
