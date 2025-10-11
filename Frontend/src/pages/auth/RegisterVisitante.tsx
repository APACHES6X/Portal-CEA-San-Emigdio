import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import './RegisterVisitante.css';
import logoSanEmigdio from '../../assets/images/Logo_San_Emigdio.png';

interface FormData {
  // Paso 1 - Información Personal
  primerNombre: string;
  segundoNombre: string;
  primerApellido: string;
  segundoApellido: string;
  genero: string;
  eps: string;
  tipoSangre: string;
  
  // Paso 2 - Documentación
  tipoDocumento: string;
  numeroDocumento: string;
  diaNacimiento: string;
  mesNacimiento: string;
  añoNacimiento: string;
  telefono: string;
  
  // Paso 3 - Ubicación y Salud
  pais: string;
  ciudad: string;
  direccion: string;
  
  // Paso 4 - Cuenta
  email: string;
  password: string;
}

type Direction = 'next' | 'prev';

const RegisterVisitante = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [direction, setDirection] = useState<Direction>('next');
  const [formData, setFormData] = useState<FormData>({
    primerNombre: '',
    segundoNombre: '',
    primerApellido: '',
    segundoApellido: '',
    genero: '',
    eps: '',
    tipoSangre: '',
    tipoDocumento: '',
    numeroDocumento: '',
    diaNacimiento: '',
    mesNacimiento: '',
    añoNacimiento: '',
    telefono: '',
    pais: '',
    ciudad: '',
    direccion: '',
    email: '',
    password: ''
  });

  useEffect(() => {
    window.history.replaceState({ step: currentStep }, '');

    const handlePopState = (event: PopStateEvent) => {
      const state = event.state as { step: number } | null;
      if (state?.step) {
        const newStep = state.step;
        setDirection(newStep < currentStep ? 'prev' : 'next');
        setCurrentStep(newStep);
        updateProgress(newStep);
      } else {
        if (currentStep === 1) {
          navigate('/register');
        } else {
          const newStep = currentStep - 1;
          setDirection('prev');
          setCurrentStep(newStep);
          window.history.pushState({ step: newStep }, '');
          updateProgress(newStep);
        }
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, [currentStep, navigate]);

  const updateProgress = (step: number) => {
    document.documentElement.style.setProperty('--step-progress', `${(step - 1) * 33.33}%`);
    const stepsElement = document.querySelector('.steps');
    if (stepsElement) {
      stepsElement.setAttribute('data-current-step', step.toString());
    }
  };

  const handleBackToTypes = () => {
    navigate('/register');
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const nextStep = () => {
    const newStep = currentStep + 1;
    setDirection('next');
    setCurrentStep(newStep);
    window.history.pushState({ step: newStep }, '', `#step-${newStep}`);
    updateProgress(newStep);
  };

  const prevStep = () => {
    const newStep = currentStep - 1;
    setDirection('prev');
    setCurrentStep(newStep);
    window.history.pushState({ step: newStep }, '', `#step-${newStep}`);
    updateProgress(newStep);
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className={`form-step active ${direction}`}>
            <h2>Información Personal</h2>
            <div className="input-row name-row">
              <div className="input-group">
                <input
                  type="text"
                  name="primerNombre"
                  value={formData.primerNombre}
                  onChange={handleInputChange}
                  className="input-field"
                  placeholder=" "
                  required
                />
                <label className="input-label">Primer Nombre</label>
              </div>
              <div className="input-group">
                <input
                  type="text"
                  name="segundoNombre"
                  value={formData.segundoNombre}
                  onChange={handleInputChange}
                  className="input-field"
                  placeholder=" "
                />
                <label className="input-label">Segundo Nombre</label>
              </div>
            </div>
            <div className="input-row name-row">
              <div className="input-group">
                <input
                  type="text"
                  name="primerApellido"
                  value={formData.primerApellido}
                  onChange={handleInputChange}
                  className="input-field"
                  placeholder=" "
                  required
                />
                <label className="input-label">Primer Apellido</label>
              </div>
              <div className="input-group">
                <input
                  type="text"
                  name="segundoApellido"
                  value={formData.segundoApellido}
                  onChange={handleInputChange}
                  className="input-field"
                  placeholder=" "
                />
                <label className="input-label">Segundo Apellido</label>
              </div>
            </div>
            <div className="input-row select-row">
              <div className="input-group">
                <input
                  type="text"
                  name="genero"
                  value={formData.genero}
                  onChange={handleInputChange}
                  className="input-field"
                  placeholder=" "
                  required
                />
                <label className="input-label">Género</label>
              </div>
              <div className="input-group">
                <input
                  type="text"
                  name="eps"
                  value={formData.eps}
                  onChange={handleInputChange}
                  className="input-field"
                  placeholder=" "
                  required
                />
                <label className="input-label">EPS</label>
              </div>
              <div className="input-group">
                <input
                  type="text"
                  name="tipoSangre"
                  value={formData.tipoSangre}
                  onChange={handleInputChange}
                  className="input-field"
                  placeholder=" "
                  required
                />
                <label className="input-label">RH</label>
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className={`form-step ${currentStep === 2 ? 'active' : ''} ${direction}`}>
            <h2>Documentación</h2>
            <div className="input-row name-row">
              <div className="input-group">
                <input
                  type="text"
                  name="tipoDocumento"
                  value={formData.tipoDocumento}
                  onChange={handleInputChange}
                  className="input-field"
                  placeholder=" "
                  required
                />
                <label className="input-label">Tipo de Documento</label>
              </div>
              <div className="input-group">
                <input
                  type="text"
                  name="numeroDocumento"
                  value={formData.numeroDocumento}
                  onChange={handleInputChange}
                  className="input-field"
                  placeholder=" "
                  required
                />
                <label className="input-label">Número de Documento</label>
              </div>
            </div>
            <div className="birth-date-section">
              <div className="date-header">
                <label className="date-label">
                  <svg className="calendar-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M8 2V5M16 2V5M3.5 9.09H20.5M21 8.5V17C21 20 19.5 22 16 22H8C4.5 22 3 20 3 17V8.5C3 5.5 4.5 3.5 8 3.5H16C19.5 3.5 21 5.5 21 8.5Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  Fecha de Nacimiento
                </label>
              </div>
              <div className="birth-date-container">
                <div className="date-fields">
                  <div className="input-group date-input">
                    <input
                      type="text"
                      name="diaNacimiento"
                      value={formData.diaNacimiento}
                      onChange={handleInputChange}
                      className="input-field"
                      placeholder=" "
                      maxLength={2}
                      required
                    />
                    <label className="input-label">Día</label>
                  </div>
                  <div className="input-group date-input">
                    <input
                      type="text"
                      name="mesNacimiento"
                      value={formData.mesNacimiento}
                      onChange={handleInputChange}
                      className="input-field"
                      placeholder=" "
                      maxLength={2}
                      required
                    />
                    <label className="input-label">Mes</label>
                  </div>
                  <div className="input-group date-input">
                    <input
                      type="text"
                      name="añoNacimiento"
                      value={formData.añoNacimiento}
                      onChange={handleInputChange}
                      className="input-field"
                      placeholder=" "
                      maxLength={4}
                      required
                    />
                    <label className="input-label">Año</label>
                  </div>
                </div>
                <div className="input-group phone-input">
                  <input
                    type="tel"
                    name="telefono"
                    value={formData.telefono}
                    onChange={handleInputChange}
                    className="input-field"
                    placeholder=" "
                    required
                  />
                  <label className="input-label">Teléfono</label>
                </div>
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className={`form-step ${currentStep === 3 ? 'active' : ''} ${direction}`}>
            <h2>Ubicación</h2>
            <div className="input-row name-row">
              <div className="input-group">
                <input
                  type="text"
                  name="pais"
                  value={formData.pais}
                  onChange={handleInputChange}
                  className="input-field"
                  placeholder=" "
                  required
                />
                <label className="input-label">País</label>
              </div>
              <div className="input-group">
                <input
                  type="text"
                  name="ciudad"
                  value={formData.ciudad}
                  onChange={handleInputChange}
                  className="input-field"
                  placeholder=" "
                  required
                />
                <label className="input-label">Ciudad</label>
              </div>
            </div>
            <div className="input-row">
              <div className="input-group">
                <input
                  type="text"
                  name="direccion"
                  value={formData.direccion}
                  onChange={handleInputChange}
                  className="input-field"
                  placeholder=" "
                  required
                />
                <label className="input-label">Dirección</label>
              </div>
            </div>
          </div>
        );

      case 4:
        return (
          <div className={`form-step ${currentStep === 4 ? 'active' : ''} ${direction}`}>
            <h2>Cuenta</h2>
            <div className="input-row name-row">
              <div className="input-group">
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="input-field"
                  placeholder=" "
                  required
                />
                <label className="input-label">Correo Electrónico</label>
              </div>
              <div className="input-group">
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className="input-field"
                  placeholder=" "
                  required
                />
                <label className="input-label">Contraseña</label>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('Datos del formulario de visitante:', formData);
  };

  return (
    <div className="register-container">
      <div className="register-box">
        <img src={logoSanEmigdio} alt="Logo Parque San Emigdio" className="park-logo" />
        <h2 className="register-title">Registro de Visitante</h2>

        <div className="progress-container">
          <div className="progress-bar">
            <div 
              className="progress" 
              style={{ width: `${((currentStep - 1) / 3) * 100}%` }}
            ></div>
          </div>
          <div className="steps" data-current-step={currentStep}>
            <div 
              className={`step ${currentStep >= 1 ? 'active' : ''} ${currentStep > 1 ? 'completed' : ''}`}
              title="Información Personal"
            >1</div>
            <div 
              className={`step ${currentStep >= 2 ? 'active' : ''} ${currentStep > 2 ? 'completed' : ''}`}
              title="Documentación"
            >2</div>
            <div 
              className={`step ${currentStep >= 3 ? 'active' : ''} ${currentStep > 3 ? 'completed' : ''}`}
              title="Ubicación y Salud"
            >3</div>
            <div 
              className={`step ${currentStep >= 4 ? 'active' : ''}`}
              title="Cuenta"
            >4</div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="register-form">
          {renderStep()}
          
          <div className="form-navigation">
            {currentStep > 1 ? (
              <button type="button" onClick={prevStep} className="prev-btn">
                <svg className="arrow-icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5M12 19l-7-7 7-7"/></svg> Volver
              </button>
            ) : (
              <button type="button" onClick={handleBackToTypes} className="prev-btn">
                <svg className="arrow-icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5M12 19l-7-7 7-7"/></svg> Volver
              </button>
            )}
            {currentStep < 4 ? (
              <button type="button" onClick={nextStep} className="next-btn">
                Siguiente <svg className="arrow-icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
              </button>
            ) : (
              <button type="submit" className="submit-btn">
                Registrar Visita
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterVisitante;