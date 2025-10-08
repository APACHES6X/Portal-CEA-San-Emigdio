import React from 'react';
import { useNavigate } from 'react-router-dom';
import logoSanEmigdio from '../assets/images/Logo_San_Emigdio.png';

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-green-100 pt-16">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto text-center">
          <img
            src={logoSanEmigdio}
            alt="Logo San Emigdio"
            className="w-40 h-40 mx-auto mb-8 rounded-full shadow-lg"
          />
          <h1 className="text-4xl font-bold text-green-800 mb-4">
            Bienvenido al Portal CEA San Emigdio
          </h1>
          <p className="text-xl text-green-700 mb-8">
            Centro de Educación Ambiental y Conservación
          </p>
          <button
            onClick={() => navigate('/login')}
            className="bg-green-600 text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-green-700 transition-colors duration-300 shadow-md hover:shadow-lg"
          >
            Iniciar Sesión
          </button>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;