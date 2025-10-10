import React, { FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Eye, EyeOff } from 'lucide-react';
import Logo from '../../assets/images/Logo_San_Emigdio.png';
import './Login.css';

interface LoginFormState {
  documento: string;
  password: string;
}

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [showPwd, setShowPwd] = useState<boolean>(false);
  const [formData, setFormData] = useState<LoginFormState>({
    documento: '',
    password: ''
  });

  const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    console.log('Datos de login:', formData);
    // Aquí irá la lógica de autenticación
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

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
          <form className="login-form" onSubmit={handleSubmit}>
            <div className="input-group">
              <input
                type="text"
                id="documento"
                name="documento"
                className="input-field"
                placeholder=" "
                value={formData.documento}
                onChange={handleInputChange}
                required
              />
              <label
                htmlFor="documento"
                className="input-label"
              >
                Número de Documento
              </label>
            </div>

            <div className="input-group">
              <input
                type={showPwd ? 'text' : 'password'}
                id="password"
                name="password"
                className="input-field"
                placeholder=" "
                value={formData.password}
                onChange={handleInputChange}
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
                aria-label={showPwd ? 'Ocultar contraseña' : 'Mostrar contraseña'}
              >
                {showPwd ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
            <div className="login-links">
              <a 
                href="#" 
                onClick={(e) => {
                  e.preventDefault();
                  navigate('/forgot-password');
                }}
              >
                ¿Olvidaste tu contraseña?
              </a>
            </div>
            <div className="login-links">
              <span>¿Nuevo en el Parque? </span>
              <a 
                href="#" 
                onClick={(e) => {
                  e.preventDefault();
                  navigate('/register');
                }}
              >
                Regístrate aquí
              </a>
            </div>
            <button className="login-button" type="submit">
              Iniciar sesión
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;