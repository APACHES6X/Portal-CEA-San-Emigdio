import { Video, ImageIcon } from 'lucide-react';
import { useState } from 'react';
import type { Training } from '../../types/education';
import { MediaType } from '../../types/education';
import { formatDuration, formatPhotoCount } from '../../utils/educationFormatters';

interface TrainingCardProps {
  training: Training;
  onView?: (trainingId: number) => void;
}

const TrainingCard = ({ training, onView }: TrainingCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const isVideo = training.type === MediaType.VIDEO;

  return (
    <div 
      className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => onView?.(training.id)}
    >
      {/* Card Header with Gradient and Hover Effect */}
      <div className="relative bg-gradient-to-r from-purple-500 to-indigo-600 p-12 flex items-center justify-center overflow-hidden">
        <span className="text-6xl z-10" role="img" aria-label={training.title}>
          {training.emoji}
        </span>
        
        {/* Hover Overlay */}
        {isHovered && (
          <div className="absolute inset-0 bg-black/60 flex items-center justify-center transition-all duration-300">
            {isVideo ? (
              <Video size={48} className="text-white" />
            ) : (
              <ImageIcon size={48} className="text-white" />
            )}
          </div>
        )}

        {/* Badge */}
        <div className="absolute top-3 right-3">
          <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
            isVideo ? 'bg-purple-700 text-white' : 'bg-blue-700 text-white'
          }`}>
            {training.type}
          </span>
        </div>
      </div>

      {/* Card Body */}
      <div className="p-5 space-y-3">
        <h3 className="text-lg font-bold text-gray-800 line-clamp-2">
          {training.title}
        </h3>
        <p className="text-gray-600 text-sm leading-relaxed line-clamp-2">
          {training.description}
        </p>

        {/* Details */}
        <div className="space-y-1 text-sm">
          <div>
            <span className="font-medium text-gray-700">Instructor: </span>
            <span className="text-gray-600">{training.instructor}</span>
          </div>
          <div>
            <span className="font-medium text-gray-700">
              {isVideo ? 'Duración: ' : 'Cantidad: '}
            </span>
            <span className="text-gray-600">
              {isVideo 
                ? formatDuration(training.durationMinutes!) 
                : formatPhotoCount(training.photoCount!)
              }
            </span>
          </div>
        </div>

        {/* CTA Button */}
        <button
          className="w-full bg-purple-600 hover:bg-purple-700 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200 text-sm"
        >
          {isVideo ? 'Ver Video' : 'Ver Galería'}
        </button>
      </div>
    </div>
  );
};

export default TrainingCard;