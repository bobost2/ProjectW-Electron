import WindowComponent from 'components/WindowComponent/WindowComponent';
import GlassButtonComponent from 'components/User/GlassButton/GlassButton';
import React, { FC, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './TrainScreen.module.scss';
import { Box, Grid } from '@mui/material';

interface TrainScreenProps {}

const TrainScreen: FC<TrainScreenProps> = () => {

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
                <div>KM: </div>
                <div>99</div>
              </div>
              <div className={styles.MiniStatBox}>
                <div>Time passed: </div>
                <div>1:02</div>
              </div>
            </div>
            <div className={styles.StatDivider}>
              <div className={styles.MiniStatBox}>
                <div>Calories: </div>
                <div>422</div>
              </div>
              <div className={styles.MiniStatBox}>
                <div>Avg KM/H: </div>
                <div>14</div>
              </div>
            </div>
          </div>
          <div className={styles.BoxGoals}>
            <div className={styles.BoxTitleStats}>
              <div className={styles.BoxTitleStats_text}>Goals:</div>
            </div>
          </div>
        </div>
        <div style={{position: 'fixed', right: '7.5rem', bottom: '10.6rem'}}>
          <GlassButtonComponent v2 text='Finish session' iconPreset={8} eventClick={finishSession} />
        </div>
      </WindowComponent>
    </div>
  );
}
export default TrainScreen;
