import WindowComponent from 'components/WindowComponent/WindowComponent';
import styles from './MainPage.module.scss';
import SelectUser from './SelectUser/SelectUser';
import AddUserComponent from './AddUser/AddUser';
import { FC, useState } from 'react';

interface MainPageProps {}

const MainPage: FC<MainPageProps> = () => {
  
  const [animFadeAway, setAnimationFadeAway] = useState(false);
  const [windowTitle, setWindowTitle] = useState("Select user:");
  const [isInUserCreation, setIsInUserCreation] = useState(false);

  function AddUser() {
    setAnimationFadeAway(true);
    setTimeout(() => {
      setIsInUserCreation(true);
      setAnimationFadeAway(false);
      setWindowTitle("Add user:");
    }, 500)
  }

  function ReturnToSelection(){
    setAnimationFadeAway(true);
    setTimeout(() => {
      setIsInUserCreation(false);
      setAnimationFadeAway(false);
      setWindowTitle("Select user:");
    }, 500)
  }

  return(
    <div className={styles.MainPage}>
      <WindowComponent title={windowTitle} height={"33rem"} padding={"2rem"}>
        <div style={{maxHeight: '26.2rem'}} className={animFadeAway ? styles.InsideWindowFade : styles.InsideWindow }>
          {isInUserCreation ?
            <AddUserComponent ReturnToSelection={ReturnToSelection}/> 
            :
            <SelectUser AddUser={AddUser}/>
          }  
        </div>
      </WindowComponent>
    </div>
  );
};
export default MainPage;
