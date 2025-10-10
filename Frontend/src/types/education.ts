// Enums for the education section

export enum ActivityLevel {
  BEGINNER = "Principiante",
  INTERMEDIATE = "Intermedio",
  ALL_LEVELS = "Todos los niveles"
}

export enum MaterialCategory {
  BIOLOGY = "Biología",
  AGRICULTURE = "Agricultura",
  ECOLOGY = "Ecología"
}

export enum MediaType {
  VIDEO = "Video",
  GALLERY = "Galería"
}

export enum TabType {
  ACTIVIDADES = "actividades",
  MATERIAL = "material",
  ARTICULOS = "articulos",
  CAPACITACIONES = "capacitaciones"
}

// Props types (data passed to components)
export interface Activity {
  id: number;
  emoji: string;
  title: string;
  description: string;
  durationMinutes: number;
  participantsMin: number;
  participantsMax: number;
  level: ActivityLevel;
}

export interface Material {
  id: number;
  title: string;
  description: string;
  category: MaterialCategory;
  fileType: string;
  fileSizeMB: number;
}

export interface Article {
  id: number;
  title: string;
  abstract: string;
  authors: string[];
  journal: string;
  year: number;
}

export interface Training {
  id: number;
  emoji: string;
  title: string;
  description: string;
  instructor: string;
  durationMinutes?: number;
  photoCount?: number;
  type: MediaType;
}

export interface EducationPageProps {
  activities: Activity[];
  materials: Material[];
  articles: Article[];
  trainings: Training[];
}