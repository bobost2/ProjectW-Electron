import React, { FC, useEffect } from 'react';
import styles from './SerialPortComponent.module.scss';
import {ipcRenderer} from 'electron';
interface SerialPortComponentProps {}

const SerialPortComponent: FC<SerialPortComponentProps> = () => 
{
  const getSerialLibrary = async (): Promise<any> => {
    // async () => {
    //   //const result = await ipcRenderer.invoke('serialPortLibrary');
    //   const result = window.Electron.ipcRenderer.invoke('serialPortLibrary');
    //   console.log(result);
    //   // ...
    // }
    ipcRenderer.send("msg", "bruh");
    ipcRenderer.on("reply", (event, data) => {
      console.log(data);
    });
  }
  
  return(
    <div className={styles.SerialPortComponent}>
      <button onClick={getSerialLibrary}>Press for disappoitment!</button>
    </div> 
  );
}

export default SerialPortComponent;
