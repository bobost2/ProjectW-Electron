import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, IconButton } from '@mui/material';
import React, { FC, useEffect, useState } from 'react';
import styles from './SystemBar.module.scss';
import PowerSettingsNewIcon from '@mui/icons-material/PowerSettingsNew';
import CableIcon from '@mui/icons-material/Cable';
import {ipcRenderer} from 'electron';

interface SystemBarProps {}

const SystemBar: FC<SystemBarProps> = () => {

  const [currentTime, setCurrentTime] = useState("HH:MM");

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  function shutdownSystem(){
    handleClose();
    ipcRenderer.send("systemShutdown");
  }

  function startTime() {
    const today = new Date();
    let h = today.getHours();
    let m = today.getMinutes();
    //let s = today.getSeconds();
    m = checkTime(m);
    //s = checkTime(s);
    setCurrentTime(`${h}:${m}`);
    setTimeout(startTime, 1000);
  }
  
  function checkTime(i:any) {
    if (i < 10) {i = "0" + i};
    return i;
  }

  useEffect(() => {
    startTime();
  }, [])
  
  
  return (
    <div className={styles.SystemBar}>
      <div className={styles.InsideBar}>
        <CableIcon color="warning" style={{marginLeft: '15px'}}/>
        <div className={styles.Clock}>
          {currentTime}
        </div>
        <IconButton color="error" aria-label="shutdown-system" style={{marginRight: '5px'}} onClick={handleClickOpen}>
          <PowerSettingsNewIcon />
        </IconButton>
      </div>


      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Shutdown the system"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure that you want to shutdown the system?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} autoFocus>No</Button>
          <Button onClick={shutdownSystem}>Yes</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
export default SystemBar;
