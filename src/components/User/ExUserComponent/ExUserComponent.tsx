import React, { FC } from 'react';
import styles from '../AddUserComponent/AddUserComponent.module.scss';

interface AddUserComponentProps {
  username: string;
  avatar: string;
}

//Username limit - 14

const AddUserComponent: FC<AddUserComponentProps> = (props) => {
  
  function DisplayAvatar(){
    if(props.avatar !== null){
      return (
        <div className={styles.profileBox_plusSign}>#</div>
      );    
    }
    else
    {
      return (
        <div className={styles.profileBox_plusSign}>?</div>
      );    
    }
  }
  
  return (
    <div className={styles.AddUserComponent}>
      <div className={styles.profileBox}>
        {DisplayAvatar()}
      </div>
      <div className={styles.TextUser}>{props.username}</div>
    </div>
  );
}

export default AddUserComponent;
