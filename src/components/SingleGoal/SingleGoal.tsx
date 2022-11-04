import { LinearProgress } from '@mui/material';
import React, { FC } from 'react';
import styles from './SingleGoal.module.scss';

interface SingleGoalProps {
  goalTitle: string;
  goalMax: number;
  goalPercentage: number;
  goalType: string;
}

const SingleGoal: FC<SingleGoalProps> = (props) => {
 
  return (
    <div className={styles.SingleGoal} style={{background: props.goalPercentage>=props.goalMax ? "#00a71459" : "#00000063"}}>
      <div style={{fontSize: '18px', fontWeight: '600'}}>{props.goalTitle}</div>
      <div style={{marginTop: '5px'}}>
        <LinearProgress variant="determinate" color={props.goalPercentage>=props.goalMax ? 'success' : 'secondary'} value={props.goalPercentage>=props.goalMax ? 100 : (props.goalPercentage/props.goalMax)*100} />
        <div style={{textAlignLast: 'end', marginTop: '2px', fontSize: '14px'}}>{props.goalMax + " " + props.goalType}</div>
      </div>
    </div>
  );
}
export default SingleGoal;
