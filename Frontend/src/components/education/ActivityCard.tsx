import { Clock, Users } from 'lucide-react';
import type { Activity } from '../../types/education';
import { formatDuration, formatParticipants } from '../../utils/educationFormatters';

interface ActivityCardProps {
  activity: Activity;
  onReserve?: (activityId: number) => void;
}

const ActivityCard = ({ activity, onReserve }: ActivityCardProps) => {
  const getLevelColor = (level: string) => {
    switch (level) {
      case 'Principiante':
        return 'bg-green-100 text-green-700';
      case 'Intermedio':
        return 'bg-yellow-100 text-yellow-700';
      default:
        return 'bg-blue-100 text-blue-700';
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
      {/* Card Header with Gradient */}
      <div className="bg-gradient-to-r from-green-500 to-emerald-600 rounded-t-xl p-8 flex items-center justify-center">
        <span className="text-6xl" role="img" aria-label={activity.title}>
          {activity.emoji}
        </span>
      </div>

      {/* Card Body */}
      <div className="p-6 space-y-4">
        <h3 className="text-xl font-bold text-gray-800">{activity.title}</h3>
        <p className="text-gray-600 text-sm leading-relaxed">
          {activity.description}
        </p>

        {/* Details */}
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-gray-700">
            <Clock size={18} className="text-green-600" />
            <span className="text-sm">
              <span className="font-medium">Duración:</span> {formatDuration(activity.durationMinutes)}
            </span>
          </div>
          <div className="flex items-center gap-2 text-gray-700">
            <Users size={18} className="text-green-600" />
            <span className="text-sm">
              <span className="font-medium">Participantes:</span> {formatParticipants(activity.participantsMin, activity.participantsMax)}
            </span>
          </div>
        </div>

        {/* Level Badge */}
        <div>
          <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${getLevelColor(activity.level)}`}>
            Nivel: {activity.level}
          </span>
        </div>

        {/* CTA Button */}
        <button
          onClick={() => onReserve?.(activity.id)}
          className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200"
        >
          Reservar Actividad
        </button>
      </div>
    </div>
  );
};

export default ActivityCard;