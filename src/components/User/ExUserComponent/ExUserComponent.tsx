import React, { FC } from 'react';
import styles from '../AddUserComponent/AddUserComponent.module.scss';

interface AddUserComponentProps {
  user: User;
}

//Username limit - 14

const AddUserComponent: FC<AddUserComponentProps> = (props) => {
  
  function DisplayAvatar(){
    if(props.user.IconId !== 0){
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
      <div className={styles.TextUser}>{props.user.Username}</div>
    </div>
  );
}

export default AddUserComponent;
