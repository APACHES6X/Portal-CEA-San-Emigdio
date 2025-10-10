import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import LandingPage from './pages/LandingPage';
import Login from './pages/auth/Login';
import UserTypeSelect from './pages/auth/UserTypeSelect';
import RegisterVisitante from './pages/auth/RegisterVisitante';
import ForgotPassword from './pages/auth/ForgotPassword';
import Dashboard from './pages/Dashboard';
import Profile from './pages/profile/Profile';
import EducationPage from './pages/EducationPage';
import './App.css';

const App: React.FC = () => {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          {/* Rutas públicas */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<UserTypeSelect />} />
          <Route path="/register/visitante" element={<RegisterVisitante />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          
          {/* Rutas de educación */}
          <Route path="/educacion/actividades" element={<EducationPage />} />
          <Route path="/educacion/material-academico" element={<EducationPage />} />
          <Route path="/educacion/articulos-cientificos" element={<EducationPage />} />
          <Route path="/educacion/capacitaciones" element={<EducationPage />} />
          
          {/* Rutas protegidas */}
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
};

export default App;
