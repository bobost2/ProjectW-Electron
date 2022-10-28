import GlassButtonComponent from 'components/User/GlassButton/GlassButton';
import WindowComponent from 'components/WindowComponent/WindowComponent';
import React, { FC } from 'react';
import styles from './SettingsMenu.module.scss';
import { useNavigate } from 'react-router-dom';

interface SettingsMenuProps {}

const SettingsMenu: FC<SettingsMenuProps> = () => {
  
  const navigate = useNavigate();
  
  return (
    <div className={styles.SettingsMenu}>
      <WindowComponent title={`Preferences`} height={"33rem"} padding={"2rem"}>
          <GlassButtonComponent text='Account' iconPreset={6} eventClick={() => {}} />
          <GlassButtonComponent text='Set goals' iconPreset={5} eventClick={() => {}} />
          <GlassButtonComponent text='Return' iconPreset={4} eventClick={() => navigate("/MainMenuUnlocked")} />
        </WindowComponent>
    </div>
  );
}

export default SettingsMenu;
