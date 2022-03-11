import { Button } from '@mui/material';
import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';

const MainPage = () => {
  return (
    <div>

    </div>
  );
};

export default function App() {
  return (
    <><link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" />
    <Button variant="contained">Really cool looking button.</Button>
    <Router>
      <Routes>
        <Route path="/" element={<MainPage />} />
      </Routes>
    </Router></>
  );
}
