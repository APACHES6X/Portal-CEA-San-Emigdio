export const API_URL = process.env.VITE_API_URL || 'http://localhost:3000';

// Rutas de la aplicación
export const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  REGISTER: '/register',
  DASHBOARD: '/dashboard',
  PROFILE: '/profile',
  FORGOT_PASSWORD: '/forgot-password',
} as const;

// Roles de usuario
export const USER_ROLES = {
  ADMIN: 'admin',
  USER: 'user',
  VISITOR: 'visitor',
} as const;

// Estados de autenticación
export const AUTH_STATUS = {
  IDLE: 'idle',
  LOADING: 'loading',
  AUTHENTICATED: 'authenticated',
  UNAUTHENTICATED: 'unauthenticated',
  ERROR: 'error',
} as const;

// Mensajes de error
export const ERROR_MESSAGES = {
  INVALID_CREDENTIALS: 'Credenciales inválidas',
  SERVER_ERROR: 'Error en el servidor',
  NETWORK_ERROR: 'Error de conexión',
  UNAUTHORIZED: 'No autorizado',
  SESSION_EXPIRED: 'Sesión expirada',
} as const;

// Configuración de almacenamiento local
export const STORAGE_KEYS = {
  AUTH_TOKEN: 'auth_token',
  USER_DATA: 'user_data',
  THEME: 'theme_preference',
} as const;

// Temas disponibles
export const THEMES = {
  LIGHT: 'light',
  DARK: 'dark',
  SYSTEM: 'system',
} as const;

// Tiempo de expiración del token (en milisegundos)
export const TOKEN_EXPIRATION = 24 * 60 * 60 * 1000; // 24 horas