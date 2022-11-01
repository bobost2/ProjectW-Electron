import GlassButtonComponent from 'components/User/GlassButton/GlassButton';
import WindowComponent from 'components/WindowComponent/WindowComponent';
import React, { FC, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './PreviousSessions.module.scss';
import { DataGrid, GridRowsProp, GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import { ipcRenderer } from 'electron';

interface PreviousSessionsProps {}

interface ActivityTable{
  id: number;
  date: Date;
  time: string;
  duration: string;
  calBurned: number;
  kmAll: number;
  avgKM: number;
}

const PreviousSessions: FC<PreviousSessionsProps> = () => {

  const columns: GridColDef[] = [
    { field: 'date', type: 'date', headerName: 'Date', width: 140},
    { field: 'time', headerName: 'Time', width: 110 },
    { field: 'duration', headerName: 'Duration', width: 140 },
    { field: 'calBurned', headerName: 'Cal', width: 110 },
    { field: 'kmAll', headerName: 'KM', width: 110 },
    { field: 'avgKM', headerName: 'Avg KM/H', width: 110 },
  ];

  const [gridRows, setGridRows] = useState<ActivityTable[]>([]);

  let userId = localStorage.getItem('userId') ?? 0;
  const navigate = useNavigate();

  function fetchActivities(){
    var allActivities:ActivityTable[] = [];

    ipcRenderer.send("requestUserActivity", userId);
    ipcRenderer.once("returnAllActivities", (event, data:Activity[]) => {
      data.forEach(row => {

        var dateA = new Date(row.Date * 1000);
        var hours = dateA.getHours();
        var minutes = "0" + dateA.getMinutes();
        var formattedTime = hours + ':' + minutes.substr(-2);

        var durH = parseInt((row.MinutesTrained / 60).toString());
        var durM = row.MinutesTrained - (durH * 60);
        var durMF = durM < 10 ? '0' + durM : durM;

        allActivities.push({
          id: row.ID ?? 0,
          date: dateA,
          avgKM: row.AvgSpeed,
          duration: durH + ":" + durMF,
          calBurned: row.CaloriesBurned,
          kmAll: row.KilometersCycled,
          time: formattedTime
        });
      })
      setGridRows(allActivities);
    })
  }
  
  useEffect(() => {
    if(userId === null) navigate('/');
    fetchActivities();
  }, [])
  
  return(
    <div className={styles.PreviousSessions}>
      <WindowComponent title={`Previous sessions`} height={"33rem"} padding={"2rem"}>
        <div style={{ height: 330, width: '100%', marginBottom: '20px'}}>
          <DataGrid rows={gridRows} columns={columns} style={{ boxShadow: '0px 0px 4px black', background: '#ffffff2b'}} />
        </div>
        <GlassButtonComponent v2 text='Return' iconPreset={4} eventClick={() => navigate("/MainMenuUnlocked")} />
      </WindowComponent>
    </div>
  );
}

export default PreviousSessions;
