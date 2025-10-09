/**
 * Genera un código numérico aleatorio del tamaño especificado
 * @param length Longitud del código a generar (por defecto 6)
 * @returns Código numérico aleatorio
 */
export const generateNumericCode = (length: number = 6): string => {
  return Array.from(
    { length }, 
    () => Math.floor(Math.random() * 10)
  ).join('');
};

/**
 * Genera un token aleatorio usando valores hexadecimales
 * @param length Longitud del token a generar (por defecto 32)
 * @returns Token aleatorio en formato hexadecimal
 */
export const generateToken = (length: number = 32): string => {
  const bytes = new Uint8Array(Math.ceil(length / 2));
  crypto.getRandomValues(bytes);
  return Array.from(bytes)
    .map(byte => byte.toString(16).padStart(2, '0'))
    .join('')
    .slice(0, length);
};

/**
 * Genera un ID único usando timestamp y valores aleatorios
 * @returns ID único
 */
export const generateUniqueId = (): string => {
  const timestamp = Date.now().toString(36);
  const randomStr = Math.random().toString(36).substring(2, 8);
  return `${timestamp}-${randomStr}`;
};

/**
 * Genera una contraseña aleatoria que cumple con los requisitos de seguridad
 * @param length Longitud de la contraseña (por defecto 12)
 * @returns Contraseña segura aleatoria
 */
export const generateSecurePassword = (length: number = 12): string => {
  const lowercase = 'abcdefghijklmnopqrstuvwxyz';
  const uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const numbers = '0123456789';
  const symbols = '!@#$%^&*()_+-=[]{}|;:,.<>?';
  
  const allChars = lowercase + uppercase + numbers + symbols;
  
  // Aseguramos al menos un carácter de cada tipo
  let password = 
    lowercase[Math.floor(Math.random() * lowercase.length)] +
    uppercase[Math.floor(Math.random() * uppercase.length)] +
    numbers[Math.floor(Math.random() * numbers.length)] +
    symbols[Math.floor(Math.random() * symbols.length)];
  
  // Completamos el resto de la contraseña
  for (let i = password.length; i < length; i++) {
    password += allChars[Math.floor(Math.random() * allChars.length)];
  }
  
  // Mezclamos los caracteres
  return password
    .split('')
    .sort(() => Math.random() - 0.5)
    .join('');
};