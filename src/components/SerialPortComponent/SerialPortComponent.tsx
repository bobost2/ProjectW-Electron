import React, { FC, useEffect } from 'react';
import styles from './SerialPortComponent.module.scss';
import {ipcRenderer} from 'electron';
interface SerialPortComponentProps {}

interface SerialPortI{
  friendlyName: string;
  locationId: string;
  manufacturer: string;
  path: string;
  pnpId: string;
  productId: string;
  serialNumber: string;
  vendorId: string;
}

const SerialPortComponent: FC<SerialPortComponentProps> = () => 
{

  const getSerialPorts = async (): Promise<any> => {
    ipcRenderer.send("requestPorts");
    ipcRenderer.on("returnPorts", (event, data) => {
      var ports:SerialPortI[] = data;
      console.log(ports);
    });
  }

  useEffect(() => {
    getSerialPorts();
  }, []);
  
  return(
    <div className={styles.SerialPortComponent}>

    </div> 
  );
}

export default SerialPortComponent;
