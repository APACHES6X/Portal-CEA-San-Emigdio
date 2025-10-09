import { LucideIcon } from 'lucide-react';

export type UserType = 'visitante' | 'estudiante' | 'docente' | 'promotor';

export interface UserTypeInfo {
  key: UserType;
  label: string;
  description: string;
  icon: LucideIcon;
}

export interface User {
  id: string;
  email: string;
  name: string;
  userType: UserType;
  createdAt: string;
  updatedAt: string;
}

export interface AuthUser extends User {
  token: string;
}