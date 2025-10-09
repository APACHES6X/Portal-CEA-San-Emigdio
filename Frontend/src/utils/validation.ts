// Tipos para las validaciones
type ValidationResult = {
  isValid: boolean;
  message?: string;
};

// Validación de email
export const validateEmail = (email: string): ValidationResult => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email) {
    return { isValid: false, message: 'El correo electrónico es requerido' };
  }
  if (!emailRegex.test(email)) {
    return { isValid: false, message: 'El correo electrónico no es válido' };
  }
  return { isValid: true };
};

// Validación de contraseña
export const validatePassword = (password: string): ValidationResult => {
  if (!password) {
    return { isValid: false, message: 'La contraseña es requerida' };
  }
  if (password.length < 8) {
    return { isValid: false, message: 'La contraseña debe tener al menos 8 caracteres' };
  }
  if (!/[A-Z]/.test(password)) {
    return { isValid: false, message: 'La contraseña debe contener al menos una mayúscula' };
  }
  if (!/[a-z]/.test(password)) {
    return { isValid: false, message: 'La contraseña debe contener al menos una minúscula' };
  }
  if (!/[0-9]/.test(password)) {
    return { isValid: false, message: 'La contraseña debe contener al menos un número' };
  }
  return { isValid: true };
};

// Validación de nombre
export const validateName = (name: string): ValidationResult => {
  if (!name) {
    return { isValid: false, message: 'El nombre es requerido' };
  }
  if (name.length < 2) {
    return { isValid: false, message: 'El nombre debe tener al menos 2 caracteres' };
  }
  if (!/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(name)) {
    return { isValid: false, message: 'El nombre solo puede contener letras' };
  }
  return { isValid: true };
};

// Validación de teléfono
export const validatePhone = (phone: string): ValidationResult => {
  if (!phone) {
    return { isValid: false, message: 'El teléfono es requerido' };
  }
  if (!/^[0-9]{10}$/.test(phone)) {
    return { isValid: false, message: 'El teléfono debe tener 10 dígitos' };
  }
  return { isValid: true };
};

// Validación de código de verificación
export const validateVerificationCode = (code: string): ValidationResult => {
  if (!code) {
    return { isValid: false, message: 'El código es requerido' };
  }
  if (!/^[0-9]{6}$/.test(code)) {
    return { isValid: false, message: 'El código debe tener 6 dígitos' };
  }
  return { isValid: true };
};

// Validación de formulario
export const validateForm = (fields: Record<string, string>): Record<string, ValidationResult> => {
  const validations: Record<string, ValidationResult> = {};
  
  for (const [field, value] of Object.entries(fields)) {
    switch (field) {
      case 'email':
        validations[field] = validateEmail(value);
        break;
      case 'password':
        validations[field] = validatePassword(value);
        break;
      case 'name':
        validations[field] = validateName(value);
        break;
      case 'phone':
        validations[field] = validatePhone(value);
        break;
      case 'verificationCode':
        validations[field] = validateVerificationCode(value);
        break;
      default:
        validations[field] = { isValid: true };
    }
  }

  return validations;
};