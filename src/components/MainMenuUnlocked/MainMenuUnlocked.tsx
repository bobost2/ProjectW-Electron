import React, { FC } from 'react';
import { useParams } from 'react-router-dom';
import styles from './MainMenuUnlocked.module.scss';

interface MainMenuUnlockedProps {}

const MainMenuUnlocked: FC<MainMenuUnlockedProps> = () => {
  
  let userId = localStorage.getItem('userId');
  
  return (
    <div className={styles.MainMenuUnlocked}>
      MainMenuUnlocked + {userId}
    </div>
  );
}
export default MainMenuUnlocked;
