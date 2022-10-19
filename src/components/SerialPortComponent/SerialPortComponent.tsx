import React, { FC, useEffect } from 'react';
import styles from './SerialPortComponent.module.scss';
import {ipcRenderer} from 'electron';
interface SerialPortComponentProps {
  setPortStatus: any;
}

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

const SerialPortComponent: FC<SerialPortComponentProps> = (props) => 
{

  const getSerialPorts = async (): Promise<any> => {
    ipcRenderer.send("requestPorts");
    ipcRenderer.on("returnPort", (event, data) => {
      var port:SerialPortI = data;
      props.setPortStatus(true);
      console.log(port);
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
