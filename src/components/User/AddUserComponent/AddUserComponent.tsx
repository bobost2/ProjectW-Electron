import React, { FC } from 'react';
import styles from './AddUserComponent.module.scss';

interface AddUserComponentProps {}

//Username limit - 14

const AddUserComponent: FC<AddUserComponentProps> = () => (
  <div className={styles.AddUserComponent}>
    <div className={styles.profileBox}>
      <div className={styles.profileBox_plusSign}>+</div>
    </div>
    <div className={styles.TextUser}>Add user</div>
  </div>
);

export default AddUserComponent;
