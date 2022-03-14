import AddUserComponent from 'components/User/AddUserComponent/AddUserComponent';
import ExUserComponent from 'components/User/ExUserComponent/ExUserComponent';
import WindowComponent from 'components/WindowComponent/WindowComponent';
import React, { FC, useEffect, useState } from 'react';
import styles from './MainPage.module.scss';

interface MainPageProps {}

const MainPage: FC<MainPageProps> = () => {
  
  const [tempUsers, setTempUsers] = useState([{}]);
  const [animFadeAway, setAnimationFadeAway] = useState(false);

  function AddUser(){
    setAnimationFadeAway(true);
    setTimeout(() => {
      setAnimationFadeAway(false);
    }, 500)
  }

  useEffect(() => {
    var tempArray = [];
    tempArray.push({"avatar": null, "username": "user1"});
    tempArray.push({"avatar": "#AVATAR#", "username": "user2"});
    tempArray.push({"avatar": null, "username": "user3"});
    tempArray.push({"avatar": null, "username": "user4"});
    tempArray.push({"avatar": "#AVATAR#", "username": "user5"});
    tempArray.push({"avatar": null, "username": "user6"});


    setTempUsers(tempArray);
  },[])

  return(
    <div className={styles.MainPage}>
      <WindowComponent title={"Select user:"} height={"33rem"} padding={"2rem"}>
        <div style={{maxHeight: '26.2rem'}} className={animFadeAway ? styles.InsideWindowFade : styles.InsideWindow }>
          <span onClick={AddUser}>
            <AddUserComponent/>
          </span>
          
          { tempUsers.map((user:any) => (
            <span key={user.username + "_key"}>
              <ExUserComponent avatar={user.avatar} username={user.username}/>
            </span>
          ))}
        </div>
      </WindowComponent>
    </div>
  );
}
export default MainPage;
