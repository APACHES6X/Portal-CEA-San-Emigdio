import React from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Login from './pages/auth/Login';
import UserTypeSelect from './pages/auth/UserTypeSelect';
import LandingPage from './pages/LandingPage';

const MainApp = () => {
  const location = useLocation();
  const isAuthPage = ['/login', '/user-type-select'].includes(location.pathname);

  return (
    <div className="min-h-screen">
      {!isAuthPage && <Navbar />}
      <main className="h-full">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/user-type-select" element={<UserTypeSelect />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
    </div>
  );
};

const App = () => {
  return (
    <BrowserRouter>
      <MainApp />
    </BrowserRouter>
  );
};

export default App;
