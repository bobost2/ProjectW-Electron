import React, { FC, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styles from './MainMenuUnlocked.module.scss';

interface MainMenuUnlockedProps {}

const MainMenuUnlocked: FC<MainMenuUnlockedProps> = () => {
  
  const navigate = useNavigate();
  
  let userId = localStorage.getItem('userId');

  useEffect(() => {
    if(localStorage.getItem('userId') === null) navigate('/');
  }, [])
  
  return (
    <div className={styles.MainMenuUnlocked}>
      MainMenuUnlocked + {userId}
    </div>
  );
}
export default MainMenuUnlocked;
