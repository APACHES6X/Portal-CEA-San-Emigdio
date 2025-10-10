import React, { useState, FormEvent } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { forgotPassword } from '../../services/authService';
import { ForgotPasswordFormData, FormErrors } from '../../types/forms';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import Logo from '../../assets/images/Logo_San_Emigdio.png';

const ForgotPassword: React.FC = () => {
  const [formData, setFormData] = useState<ForgotPasswordFormData>({ email: '' });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    
    if (!formData.email) {
      newErrors.email = 'El correo electrónico es requerido';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Correo electrónico inválido';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);
    try {
      await forgotPassword(formData.email);
      setIsSuccess(true);
    } catch (error) {
      setErrors({
        form: error instanceof Error ? error.message : 'Error al procesar la solicitud'
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="max-w-md w-full p-6 bg-white rounded-lg shadow-lg">
          <div className="text-center mb-8">
            <img 
              src={Logo} 
              alt="Logo Parque San Emigdio" 
              className="mx-auto h-24 w-auto mb-4"
            />
            <h2 className="text-2xl font-bold text-gray-900">¡Correo enviado!</h2>
            <p className="mt-2 text-gray-600">
              Hemos enviado las instrucciones para restablecer tu contraseña a {formData.email}
            </p>
          </div>
          <Link
            to="/login"
            className="block w-full text-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary/90"
          >
            Volver al inicio de sesión
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full p-6 bg-white rounded-lg shadow-lg">
        <Link
          to="/login"
          className="inline-flex items-center text-sm text-gray-600 hover:text-gray-900 mb-6"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Volver al inicio de sesión
        </Link>

        <div className="text-center mb-8">
          <img 
            src={Logo} 
            alt="Logo Parque San Emigdio" 
            className="mx-auto h-24 w-auto mb-4"
          />
          <h2 className="text-2xl font-bold text-gray-900">
            ¿Olvidaste tu contraseña?
          </h2>
          <p className="mt-2 text-gray-600">
            Ingresa tu correo electrónico y te enviaremos las instrucciones para restablecerla
          </p>
        </div>

        {errors.form && (
          <div className="mb-4 p-3 bg-red-50 text-red-700 rounded-md" role="alert">
            {errors.form}
          </div>
        )}

        <form onSubmit={handleSubmit} noValidate>
          <div className="mb-6">
            <Input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="Correo electrónico"
              error={errors.email}
              disabled={isLoading}
              required
            />
          </div>

          <Button
            type="submit"
            className="w-full"
            isLoading={isLoading}
          >
            Enviar instrucciones
          </Button>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;