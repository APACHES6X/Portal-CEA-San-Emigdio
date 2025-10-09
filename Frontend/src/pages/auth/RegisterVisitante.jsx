import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './RegisterVisitante.css';
import logoSanEmigdio from '../../assets/images/Logo_San_Emigdio.png';

const RegisterVisitante = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [direction, setDirection] = useState('next');

  useEffect(() => {
    // Guardar el paso actual en el historial
    window.history.replaceState({ step: currentStep }, '');

    // Manejar el evento popstate (cuando se usa el botón atrás/adelante del navegador)
    const handlePopState = (event) => {
      if (event.state && event.state.step) {
        const newStep = event.state.step;
        if (newStep < currentStep) {
          setDirection('prev');
        } else {
          setDirection('next');
        }
        setCurrentStep(newStep);
        
        // Actualizar la barra de progreso
        document.documentElement.style.setProperty('--step-progress', `${(newStep - 1) * 33.33}%`);
        
        // Actualizar el atributo data-current-step
        const stepsElement = document.querySelector('.steps');
        if (stepsElement) {
          stepsElement.setAttribute('data-current-step', newStep);
        }
      } else {
        // Si no hay estado y estamos en el primer paso, volvemos a la selección de tipo
        if (currentStep === 1) {
          navigate('/user-type-select');
        } else {
          // Si no hay estado pero no estamos en el primer paso, volvemos al paso anterior
          const newStep = currentStep - 1;
          setDirection('prev');
          setCurrentStep(newStep);
          window.history.pushState({ step: newStep }, '');
          
          // Actualizar la barra de progreso
          document.documentElement.style.setProperty('--step-progress', `${(newStep - 1) * 33.33}%`);
          
          // Actualizar el atributo data-current-step
          const stepsElement = document.querySelector('.steps');
          if (stepsElement) {
            stepsElement.setAttribute('data-current-step', newStep);
          }
        }
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, [currentStep, navigate]);

  const handleBackToTypes = () => {
    navigate('/user-type-select');
  };
  const [formData, setFormData] = useState({
    // Paso 1 - Información Personal
    primerNombre: '',
    segundoNombre: '',
    primerApellido: '',
    segundoApellido: '',
    genero: '',
    
    // Paso 2 - Documentación
    tipoDocumento: '',
    numeroDocumento: '',
    fechaNacimiento: '',
    telefono: '',
    
    // Paso 3 - Ubicación y Salud
    pais: '',
    ciudad: '',
    direccion: '',
    eps: '',
    
    // Paso 4 - Motivo de Visita
    motivoVisita: '',
    fechaVisita: '',
    horaVisita: '',
    personaVisita: ''
  });

  const handleInputChange = (e) => {
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
    
    // Añadir nueva entrada al historial
    window.history.pushState({ step: newStep }, '', `#step-${newStep}`);
    
    // Actualizar la variable CSS para el progreso
    document.documentElement.style.setProperty('--step-progress', `${(newStep - 1) * 33.33}%`);
    
    // Actualizar el atributo data-current-step
    const stepsElement = document.querySelector('.steps');
    if (stepsElement) {
      stepsElement.setAttribute('data-current-step', newStep);
    }
  };

  const prevStep = () => {
    const newStep = currentStep - 1;
    setDirection('prev');
    setCurrentStep(newStep);
    
    // Modificar el historial
    if (newStep === 1) {
      window.history.pushState({ step: 1 }, '', '#step-1');
    } else {
      window.history.pushState({ step: newStep }, '', `#step-${newStep}`);
    }
    
    // Actualizar la variable CSS para el progreso
    document.documentElement.style.setProperty('--step-progress', `${(newStep - 1) * 33.33}%`);
    
    // Actualizar el atributo data-current-step
    const stepsElement = document.querySelector('.steps');
    if (stepsElement) {
      stepsElement.setAttribute('data-current-step', newStep);
    }
  };

  const renderStep = () => {
    switch(currentStep) {
      case 1:
        return (
          <div className={`form-step active ${direction}`}>
            <h2>Información Personal</h2>
            <div className="input-row">
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
            <div className="input-row">
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
            <div className="input-group">
              <select
                name="genero"
                value={formData.genero}
                onChange={handleInputChange}
                className="input-field"
                required
              >
                <option value="">Género</option>
                <option value="masculino">Masculino</option>
                <option value="femenino">Femenino</option>
                <option value="otro">Otro</option>
              </select>
            </div>
          </div>
        );
      
      case 2:
        return (
          <div className={`form-step ${currentStep === 2 ? 'active' : ''} ${direction}`}>
            <h2>Documentación</h2>
            <div className="input-group">
              <select
                name="tipoDocumento"
                value={formData.tipoDocumento}
                onChange={handleInputChange}
                className="input-field"
                required
              >
                <option value="">Seleccione una opción</option>
                <option value="cc">Cédula de Ciudadanía</option>
                <option value="ce">Cédula de Extranjería</option>
                <option value="ti">Tarjeta de Identidad</option>
                <option value="pasaporte">Pasaporte</option>
              </select>
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
            <div className="input-group">
              <input
                type="date"
                name="fechaNacimiento"
                value={formData.fechaNacimiento}
                onChange={handleInputChange}
                className="input-field"
                required
              />
              <label className="input-label">Fecha de Nacimiento</label>
            </div>
            <div className="input-group">
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
        );
      
      case 3:
        return (
          <div className={`form-step ${currentStep === 3 ? 'active' : ''}`}>
            <h2>Ubicación y Salud</h2>
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
            <div className="input-group">
              <select
                name="eps"
                value={formData.eps}
                onChange={handleInputChange}
                className="input-field"
                required
              >
                <option value="">Seleccione una opción</option>
                <option value="sura">SURA</option>
                <option value="nuevaeps">Nueva EPS</option>
                <option value="sanitas">Sanitas</option>
                <option value="compensar">Compensar</option>
              </select>
              <label className="input-label">EPS</label>
            </div>
          </div>
        );
      
      case 4:
        return (
          <div className={`form-step ${currentStep === 4 ? 'active' : ''}`}>
            <h2>Motivo de Visita</h2>
            <div className="input-group">
              <textarea
                name="motivoVisita"
                value={formData.motivoVisita}
                onChange={handleInputChange}
                className="input-field textarea-field"
                placeholder=" "
                required
              ></textarea>
              <label className="input-label">Motivo de la Visita</label>
            </div>
            <div className="input-group">
              <input
                type="date"
                name="fechaVisita"
                value={formData.fechaVisita}
                onChange={handleInputChange}
                className="input-field"
                required
              />
              <label className="input-label">Fecha de Visita</label>
            </div>
            <div className="input-group">
              <input
                type="time"
                name="horaVisita"
                value={formData.horaVisita}
                onChange={handleInputChange}
                className="input-field"
                required
              />
              <label className="input-label">Hora de Visita</label>
            </div>
            <div className="input-group">
              <input
                type="text"
                name="personaVisita"
                value={formData.personaVisita}
                onChange={handleInputChange}
                className="input-field"
                placeholder=" "
                required
              />
              <label className="input-label">Persona a Visitar</label>
            </div>
            <div className="summary">
              <h3>Resumen de Registro</h3>
              <p><strong>Nombre Completo:</strong> {formData.primerNombre} {formData.segundoNombre} {formData.primerApellido} {formData.segundoApellido}</p>
              <p><strong>Documento:</strong> {formData.tipoDocumento} - {formData.numeroDocumento}</p>
              <p><strong>Ubicación:</strong> {formData.ciudad}, {formData.pais}</p>
              <p><strong>Fecha y Hora de Visita:</strong> {formData.fechaVisita} {formData.horaVisita}</p>
              <p><strong>Motivo:</strong> {formData.motivoVisita}</p>
              <p><strong>Persona a Visitar:</strong> {formData.personaVisita}</p>
            </div>
          </div>
        );
      
      default:
        return null;
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí irá la lógica de envío cuando implementemos el backend
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
              title="Motivo de Visita"
            >4</div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="register-form">
        {renderStep()}
        
        <div className="form-navigation">
          {currentStep > 1 ? (
            <button type="button" onClick={prevStep} className="prev-btn">
              <svg className="arrow-icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M19 12H5M12 19l-7-7 7-7"/></svg> Volver
            </button>
          ) : (
            <button type="button" onClick={handleBackToTypes} className="prev-btn">
              <svg className="arrow-icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M19 12H5M12 19l-7-7 7-7"/></svg> Volver
            </button>
          )}
          {currentStep < 4 ? (
            <button type="button" onClick={nextStep} className="next-btn">
              Siguiente <svg className="arrow-icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
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
