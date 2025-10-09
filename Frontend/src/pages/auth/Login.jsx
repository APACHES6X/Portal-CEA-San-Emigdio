import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import Logo from '../../assets/images/Logo_San_Emigdio.png';
import './Login.css';

export default function Login() {
  const [showPwd, setShowPwd] = useState(false);

  return (
    <div className="login-container">
      <div className="login-wrapper">
        <div className="login-card">
          <div className="flex flex-col items-center text-center">
            <div className="login-logo-container">
              <img src={Logo} alt="Logo Parque" loading="lazy" className="login-logo" />
            </div>
            <h2 className="login-title">Iniciar Sesión</h2>
            <p className="login-subtitle">Accede a tu cuenta del Parque San Emigdio</p>
          </div>
          <form className="login-form" onSubmit={(e) => e.preventDefault()}>
            <div className="input-group">
              <input
                type="text"
                id="email"
                className="input-field"
                placeholder=" "
                required
              />
              <label
                htmlFor="email"
                className="input-label"
              >
                Número de Documento
              </label>
            </div>

            <div className="input-group">
              <input
                type={showPwd ? 'text' : 'password'}
                id="password"
                className="input-field"
                placeholder=" "
                required
              />
              <label
                htmlFor="password"
                className="input-label"
              >
                Contraseña
              </label>
              <button
                type="button"
                className="password-toggle"
                onClick={() => setShowPwd(!showPwd)}
              >
                {showPwd ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
            <div className="login-links">
              <a href="#">¿Olvidaste tu contraseña?</a>
            </div>
            <div className="login-links">
              <span>¿Nuevo en el Parque? </span><a href="/user-type-select">Regístrate aquí</a>
            </div>
            <button className="login-button" type="submit">
              Iniciar sesión
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

// ...existing code...
