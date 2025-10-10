// Mock data for the education section
import { ActivityLevel, MaterialCategory, MediaType } from '../types/education';
import type { EducationPageProps } from '../types/education';

// Data passed as props to the root component
export const educationMockData: EducationPageProps = {
  activities: [
    {
      id: 1,
      emoji: "🌳",
      title: "Caminata Ecológica Guiada",
      description: "Explora los senderos del parque con guías expertos que te enseñarán sobre la flora y fauna local",
      durationMinutes: 120,
      participantsMin: 15,
      participantsMax: 20,
      level: ActivityLevel.BEGINNER
    },
    {
      id: 2,
      emoji: "♻️",
      title: "Taller de Reciclaje Creativo",
      description: "Aprende a transformar materiales reciclables en objetos útiles y decorativos",
      durationMinutes: 180,
      participantsMin: 10,
      participantsMax: 15,
      level: ActivityLevel.ALL_LEVELS
    },
    {
      id: 3,
      emoji: "🦜",
      title: "Observación de Aves",
      description: "Descubre la diversidad de aves que habitan en el parque con telescopios profesionales",
      durationMinutes: 240,
      participantsMin: 8,
      participantsMax: 12,
      level: ActivityLevel.INTERMEDIATE
    },
    {
      id: 4,
      emoji: "🌱",
      title: "Huerto Escolar",
      description: "Crea y mantén un huerto orgánico aprendiendo técnicas de agricultura sostenible",
      durationMinutes: 180,
      participantsMin: 10,
      participantsMax: 15,
      level: ActivityLevel.ALL_LEVELS
    }
  ],
  materials: [
    {
      id: 1,
      title: "Guía de Biodiversidad Local",
      description: "Documento completo sobre las especies de flora y fauna presentes en el Parque San Emigdio",
      category: MaterialCategory.BIOLOGY,
      fileType: "PDF",
      fileSizeMB: 2.5
    },
    {
      id: 2,
      title: "Manual de Compostaje",
      description: "Guía práctica paso a paso para crear y mantener un sistema de compostaje efectivo",
      category: MaterialCategory.AGRICULTURE,
      fileType: "PDF",
      fileSizeMB: 1.8
    },
    {
      id: 3,
      title: "Ecosistemas de San Emigdio",
      description: "Estudio detallado de los diferentes ecosistemas presentes en el parque y su importancia",
      category: MaterialCategory.ECOLOGY,
      fileType: "PDF",
      fileSizeMB: 3.2
    }
  ],
  articles: [
    {
      id: 1,
      title: "Impacto del Cambio Climático en Ecosistemas Montañosos",
      abstract: "Este estudio analiza los efectos del cambio climático en la biodiversidad de ecosistemas montañosos similares al Parque San Emigdio, proporcionando datos sobre cambios en patrones de migración y adaptación de especies",
      authors: ["Dr. María González", "Dr. Carlos Ruiz"],
      journal: "Journal of Mountain Ecology",
      year: 2023
    },
    {
      id: 2,
      title: "Estrategias de Conservación para Especies Endémicas",
      abstract: "Investigación sobre métodos efectivos de conservación aplicados a especies endémicas de la región, incluyendo programas de reproducción y restauración de hábitats",
      authors: ["Dra. Ana Martínez", "Dr. Pedro Silva", "Dra. Laura Torres"],
      journal: "Conservation Biology Review",
      year: 2022
    },
    {
      id: 3,
      title: "Educación Ambiental y Cambio de Comportamiento",
      abstract: "Análisis del impacto de programas de educación ambiental en la modificación de comportamientos hacia prácticas más sostenibles en comunidades locales",
      authors: ["Dr. Roberto Campos", "Dra. Isabel Moreno"],
      journal: "Environmental Education Quarterly",
      year: 2024
    }
  ],
  trainings: [
    {
      id: 1,
      emoji: "🎓",
      title: "Introducción a la Educación Ambiental",
      description: "Fundamentos teóricos y prácticos para educadores ambientales",
      instructor: "Prof. Juan Pérez",
      durationMinutes: 45,
      type: MediaType.VIDEO
    },
    {
      id: 2,
      emoji: "🔭",
      title: "Técnicas de Monitoreo de Biodiversidad",
      description: "Métodos científicos para el seguimiento de especies",
      instructor: "Dra. Carmen López",
      durationMinutes: 80,
      type: MediaType.VIDEO
    },
    {
      id: 3,
      emoji: "🏞️",
      title: "Gestión de Áreas Protegidas",
      description: "Estrategias para la administración efectiva de parques naturales",
      instructor: "Ing. Miguel Ángel Torres",
      durationMinutes: 120,
      type: MediaType.VIDEO
    },
    {
      id: 4,
      emoji: "🌺",
      title: "Flora del Parque San Emigdio",
      description: "Colección fotográfica de las especies vegetales del parque",
      instructor: "Equipo Botánico",
      photoCount: 120,
      type: MediaType.GALLERY
    },
    {
      id: 5,
      emoji: "🦌",
      title: "Fauna Silvestre",
      description: "Registro visual de la vida animal en su hábitat natural",
      instructor: "Equipo de Conservación",
      photoCount: 85,
      type: MediaType.GALLERY
    },
    {
      id: 6,
      emoji: "📷",
      title: "Senderos y Paisajes",
      description: "Recorrido fotográfico por los principales senderos del parque",
      instructor: "Equipo de Fotografía",
      photoCount: 200,
      type: MediaType.GALLERY
    }
  ]
};