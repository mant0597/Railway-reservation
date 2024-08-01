import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import TicketPage from './pages/TicketPage';
import UserPage from './pages/UserPage';
import AboutPage from './pages/AboutPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import SearchTrainsPage from './pages/SearchTrainsPage';
import AddTrainPage from './pages/AddTrainPage';
import TrainPage from './pages/TrainPage';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/tickets" element={<TicketPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/users" element={<UserPage />} />
        <Route path="/add-train" element={<AddTrainPage />} />
        <Route path="/trains" element={<TrainPage />} />
        <Route path="/search-trains" element={<SearchTrainsPage />} />
      </Routes>
    </Router>
  );
}

export default App;
