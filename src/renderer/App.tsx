import MainPage from 'components/MainPage/MainPage';
import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';

export default function App() {
  return (
    <><link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" />
    <Router>
      <Routes>
        <Route path="/" element={<MainPage />} />
      </Routes>
    </Router></>
  );
}
