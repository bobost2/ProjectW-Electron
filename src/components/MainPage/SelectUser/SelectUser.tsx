import AddUserComponent from 'components/User/AddUserComponent/AddUserComponent';
import ExUserComponent from 'components/User/ExUserComponent/ExUserComponent';
import { ipcRenderer } from 'electron';
import React, { FC, useEffect, useState } from 'react';
import styles from './SelectUser.module.scss';

interface SelectUserProps {
  AddUser:any;
}

const SelectUser: FC<SelectUserProps> = (props) => {
  const [loadedUsers, setLoadedUsers] = useState<User[]>([]);
  
  useEffect(() => {
    var usersDB:User[] = [];
    ipcRenderer.send("requestUsers");
    ipcRenderer.once("returnUsers", (event, data) => {
      usersDB = data;
      setLoadedUsers(usersDB);
    });
    //There will be a console error for memory leak, but I think it's probably fake.
  },[])
  
  return(
    <div className={styles.SelectUser}>
      <span onClick={props.AddUser}>
        <AddUserComponent/>
      </span>
      { loadedUsers.map((userInList:User, i) => (
        <span key={i}>
          <ExUserComponent user={userInList}/>
        </span>
      ))}
    </div>
  );
}

export default SelectUser;
