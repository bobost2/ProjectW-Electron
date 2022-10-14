import React, { FC, useEffect, useState } from 'react';
import AddUserComponent from 'components/User/AddUserComponent/AddUserComponent';
import ExUserComponent from 'components/User/ExUserComponent/ExUserComponent';
import WindowComponent from 'components/WindowComponent/WindowComponent';
import styles from './MainPage.module.scss';
import { ReactJSXElement } from '@emotion/react/types/jsx-namespace';

interface MainPageProps {}

const MainPage: FC<MainPageProps> = () => {
  const [tempUsers, setTempUsers] = useState([{}]);
  const [animFadeAway, setAnimationFadeAway] = useState(false);
  const [windowTitle, setWindowTitle] = useState("Select user:");
  const [inCreateUser, setInCreateUser] = useState(false);  

  function AddUser() {
    setAnimationFadeAway(true);
    setTimeout(() => {
      setInCreateUser(true);
      setAnimationFadeAway(false);
    }, 500);
  }

  useEffect(() => {
    const tempArray = [];
    tempArray.push({ avatar: null, username: 'user1' });
    tempArray.push({ avatar: '#AVATAR#', username: 'user2' });
    tempArray.push({ avatar: null, username: 'user3' });
    tempArray.push({ avatar: null, username: 'user4' });
    tempArray.push({ avatar: '#AVATAR#', username: 'user5' });
    tempArray.push({ avatar: null, username: 'user6' });

    setTempUsers(tempArray);
  }, []);

  useEffect(() => {
    if(inCreateUser){
      setWindowTitle("Create user:");
    }
    else {
      setWindowTitle("Select user:");
    }
  }, [inCreateUser]);

  return (
    <div>
      <WindowComponent title={windowTitle} height="33rem" padding="2rem">
          {
            inCreateUser ? 
              <>
                <div
                  className={
                     animFadeAway ? styles.InsideWindowFade : styles.InsideWindow
                  }>
                      Create user component.
                </div>
              </>
            : 
              <>
                <div
                  style={{ maxHeight: '26.2rem' }}
                  className={
                    animFadeAway ? styles.InsideWindowFade : styles.InsideWindow
                  }
                >
                  <span onClick={AddUser}>
                    <AddUserComponent />
                  </span>
                
                  {tempUsers.map((user: any) => (
                    <span key={`${user.username}_key`}>
                      <ExUserComponent avatar={user.avatar} username={user.username} />
                    </span>
                  ))}
                </div>
              </>
          }
      </WindowComponent>
    </div>
  );
};
export default MainPage;
