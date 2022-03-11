import AddUserComponent from 'components/User/AddUserComponent/AddUserComponent';
import ExUserComponent from 'components/User/ExUserComponent/ExUserComponent';
import WindowComponent from 'components/WindowComponent/WindowComponent';
import React, { FC, useEffect, useState } from 'react';
import styles from './MainPage.module.scss';

interface MainPageProps {}

const MainPage: FC<MainPageProps> = () => {
  
  const [tempUsers, setTempUsers] = useState([{}]);

  function AddUser(){

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
      <WindowComponent title={"Select user:"} height={"35rem"} padding={"3rem"}>
        <div>
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
