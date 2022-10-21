import React, { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../AddUserComponent/AddUserComponent.module.scss';

interface AddUserComponentProps {
  user: User;
}

//Username limit - 14

const AddUserComponent: FC<AddUserComponentProps> = (props) => {
  
  const navigate = useNavigate();

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
  
  function GoToTheNextPage(){
    localStorage.setItem("userId", (props.user.ID ?? "0").toString());
    navigate('MainMenuUnlocked');
  }
  
  return (
    <div className={styles.AddUserComponent} onClick={GoToTheNextPage}>
      <div className={styles.profileBox}>
        {DisplayAvatar()}
      </div>
      <div className={styles.TextUser}>{props.user.Username}</div>
    </div>
  );
}

export default AddUserComponent;
