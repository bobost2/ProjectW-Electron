import AddUserComponent from 'components/User/AddUserComponent/AddUserComponent';
import ExUserComponent from 'components/User/ExUserComponent/ExUserComponent';
import React, { FC, useEffect, useState } from 'react';
import styles from './SelectUser.module.scss';

interface SelectUserProps {
  AddUser:any;
}

const SelectUser: FC<SelectUserProps> = (props) => {
  const [tempUsers, setTempUsers] = useState([{}]);
  
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
    <div className={styles.SelectUser}>
      <span onClick={props.AddUser}>
        <AddUserComponent/>
      </span>
      { tempUsers.map((user:any, i) => (
        <span key={i}>
          <ExUserComponent avatar={user.avatar} username={user.username}/>
        </span>
      ))}
    </div>
  );
}

export default SelectUser;
