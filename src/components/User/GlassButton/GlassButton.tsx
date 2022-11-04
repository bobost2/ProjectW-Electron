import React, { FC } from 'react';
import styles from '../AddUserComponent/AddUserComponent.module.scss';
import LogoutIcon from '@mui/icons-material/Logout';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import SettingsSuggestIcon from '@mui/icons-material/SettingsSuggest';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import KeyboardReturnIcon from '@mui/icons-material/KeyboardReturn';
import AvTimerIcon from '@mui/icons-material/AvTimer';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import SaveIcon from '@mui/icons-material/Save';
import SportsScoreIcon from '@mui/icons-material/SportsScore';

interface GlassButtonComponentProps {
  iconPreset: number;
  text: string;
  v2?: boolean;
  eventClick: () => void;
}

const GlassButtonComponent: FC<GlassButtonComponentProps> = (props) => {
  
  function DisplayAvatar(){
    switch(props.iconPreset){
      case 0:
        return (
          <div className={styles.profileBox_plusSign}><PlayCircleOutlineIcon style={{marginLeft: '8px', marginTop: '8px', textShadow: "0 0 5px white", color: "white", fontSize: "3rem"}}/></div>
        )
      case 1:
        return (
          <div className={styles.profileBox_plusSign}><LogoutIcon style={{marginLeft: '8px', marginTop: '8px', textShadow: "0 0 5px white", color: "white", fontSize: "3rem"}}/></div>
        )
      case 2:
        return (
          <div className={styles.profileBox_plusSign}><SettingsSuggestIcon style={{marginLeft: '8px', marginTop: '8px', textShadow: "0 0 5px white", color: "white", fontSize: "3rem"}}/></div>
        )
      case 3:
        return (
          <div className={styles.profileBox_plusSign}><FormatListBulletedIcon style={{marginLeft: '8px', marginTop: '8px', textShadow: "0 0 5px white", color: "white", fontSize: "3rem"}}/></div>
        )
      case 4:
        return (
          <div className={styles.profileBox_plusSign}><KeyboardReturnIcon style={{marginLeft: '8px', marginTop: '8px', textShadow: "0 0 5px white", color: "white", fontSize: "3rem"}}/></div>
        )
      case 5:
        return (
          <div className={styles.profileBox_plusSign}><AvTimerIcon style={{marginLeft: '8px', marginTop: '8px', textShadow: "0 0 5px white", color: "white", fontSize: "3rem"}}/></div>
        )
      case 6:
        return (
          <div className={styles.profileBox_plusSign}><ManageAccountsIcon style={{marginLeft: '8px', marginTop: '8px', textShadow: "0 0 5px white", color: "white", fontSize: "3rem"}}/></div>
        )
      case 7:
        return (
          <div className={styles.profileBox_plusSign}><SaveIcon style={{marginLeft: '8px', marginTop: '8px', textShadow: "0 0 5px white", color: "white", fontSize: "3rem"}}/></div>
        )
      case 8:
        return (
          <div className={styles.profileBox_plusSign}><SportsScoreIcon style={{marginLeft: '8px', marginTop: '8px', textShadow: "0 0 5px white", color: "white", fontSize: "3rem"}}/></div>
        )
    }
  }
  
  return (
    <div className={!props.v2 ? styles.AddUserComponent : styles.ButtonV2} onClick={props.eventClick}>
      <div className={styles.iconBox}>
        {DisplayAvatar()}
      </div>
      <div className={styles.TextButton}>{props.text}</div>
    </div>
  );
}

export default GlassButtonComponent;
