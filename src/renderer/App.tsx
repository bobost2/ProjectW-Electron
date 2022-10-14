
import { createTheme, ThemeProvider } from '@mui/material';
import MainPage from 'components/MainPage/MainPage';
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
      <Router>
        <Routes>
          <Route path="/" element={<MainPage />} />
        </Routes>
      </Router>
    </ThemeProvider>  
  );
}
