import { createTheme, ThemeProvider } from '@mui/material';
import GoalPreferencies from 'components/GoalPreferencies/GoalPreferencies';
import MainMenuUnlocked from 'components/MainMenuUnlocked/MainMenuUnlocked';
import MainPage from 'components/MainPage/MainPage';
import ModifyAccountPage from 'components/ModifyAccountPage/ModifyAccountPage';
import PreviousSessions from 'components/PreviousSessions/PreviousSessions';
import SettingsMenu from 'components/SettingsMenu/SettingsMenu';
import SystemBar from 'components/SystemBar/SystemBar';
import TrainScreen from 'components/TrainScreen/TrainScreen';
import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

export default function App() {
  return (
    <ThemeProvider theme={darkTheme}>
    <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" />
      <SystemBar/>
      <div className='MainBody'>
        <Router>
          <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="/MainMenuUnlocked" element={<MainMenuUnlocked />} />
            <Route path="/SettingsMenu" element={<SettingsMenu />} />
            <Route path="/GoalPreferencies" element={<GoalPreferencies />} />
            <Route path="/ModifyAccountPage" element={<ModifyAccountPage />} />
            <Route path="/PreviousSessions" element={<PreviousSessions />} />
            <Route path="/TrainScreen" element={<TrainScreen />} />
          </Routes>
        </Router>
      </div>
    </ThemeProvider>  
  );
}
