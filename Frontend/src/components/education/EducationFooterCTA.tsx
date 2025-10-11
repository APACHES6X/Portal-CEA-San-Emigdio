import { MapPin, Calendar } from 'lucide-react';

interface EducationFooterCTAProps {
  onLocationClick?: () => void;
  onScheduleClick?: () => void;
}

const EducationFooterCTA = ({ onLocationClick, onScheduleClick }: EducationFooterCTAProps) => {
  return (
    <div className="w-full bg-gradient-to-r from-green-700 to-emerald-600 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
          ¿Listo para Visitarnos?
        </h2>
        <p className="text-lg text-green-100 mb-8 max-w-2xl mx-auto">
          Descubre la belleza natural del Parque San Emigdio y participa en nuestras actividades educativas
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <button
            onClick={onLocationClick}
            className="inline-flex items-center gap-2 bg-white text-green-700 hover:bg-green-50 font-semibold py-3 px-8 rounded-lg transition-colors duration-200 shadow-lg"
          >
            <MapPin size={20} />
            Ubicación del Parque
          </button>
          <button
            onClick={onScheduleClick}
            className="inline-flex items-center gap-2 bg-emerald-800 text-white hover:bg-emerald-900 font-semibold py-3 px-8 rounded-lg transition-colors duration-200 shadow-lg"
          >
            <Calendar size={20} />
            Agendar Visita
          </button>
        </div>
      </div>
    </div>
  );
};

export default EducationFooterCTA;