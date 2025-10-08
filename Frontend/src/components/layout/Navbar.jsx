import React from 'react';
import { Link } from 'react-router-dom';
import Logo from '../../assets/images/Logo_San_Emigdio.png';

const Navbar = () => {
  return (
    <nav className="w-full bg-white/90 backdrop-blur-md border-b border-green-100 fixed top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-4">
            <Link to="/" className="flex items-center gap-3 focus:outline-none">
              <img 
                src={Logo} 
                alt="Logo Parque San Emigdio" 
                className="w-12 h-12 md:w-14 md:h-14 rounded-full object-cover shadow-sm hover:shadow-md transition-shadow" 
              />
              <div className="text-left">
                <span className="block text-lg font-bold text-green-800">Parque San Emigdio</span>
                <span className="block text-sm text-green-600">Centro de Educación Ambiental</span>
              </div>
            </Link>
          </div>

          <div className="flex items-center">
            <Link 
              to="/login" 
              className="px-6 py-2 rounded-lg bg-green-600 text-white hover:bg-green-700 transition-colors duration-300 font-medium shadow-sm hover:shadow-md"
            >
              Iniciar Sesión
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;