import GlassButtonComponent from 'components/User/GlassButton/GlassButton';
import WindowComponent from 'components/WindowComponent/WindowComponent';
import { ipcRenderer } from 'electron';
import React, { FC, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './MainMenuUnlocked.module.scss';

interface MainMenuUnlockedProps {}

const MainMenuUnlocked: FC<MainMenuUnlockedProps> = () => {
  
  const [user, setUser] = useState<User>();
  const navigate = useNavigate();
  let userId = localStorage.getItem('userId');
  
  function getUser (){
    ipcRenderer.send("returnUserInfo", userId);
    ipcRenderer.once("returnUser", (event, data:User) => {
      setUser(data);
    })
  }

  function logOut(){
    localStorage.removeItem('userId');
    navigate('/');
  }
  

  useEffect(() => {
    if(userId === null) navigate('/');
    getUser();
  }, [])
  
  return (
    <div className={styles.MainMenuUnlocked}>
      <WindowComponent title={`Logged in as ${user?.Username}`} height={"33rem"} padding={"2rem"}>
        <GlassButtonComponent text='Begin training' iconPreset={0} eventClick={() => navigate('/TrainScreen')} />
        <GlassButtonComponent text='Previous sessions' iconPreset={3} eventClick={() => navigate('/PreviousSessions')} />
        <GlassButtonComponent text='Preferences' iconPreset={2} eventClick={() => navigate('/SettingsMenu')} />
        <GlassButtonComponent text='Log out' iconPreset={1} eventClick={logOut} />
      </WindowComponent>
    </div>
  );
}
export default MainMenuUnlocked;
