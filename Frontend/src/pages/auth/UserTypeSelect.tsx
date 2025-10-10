import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Users, GraduationCap, School, Briefcase, LucideIcon } from 'lucide-react';
import './UserTypeSelect.css';

interface UserType {
  key: 'visitante' | 'estudiante' | 'docente' | 'promotor';
  label: string;
  description: string;
  icon: LucideIcon;
}

const userTypes: UserType[] = [
  {
    key: 'visitante',
    label: 'Visitante',
    description: 'Acceso para visitantes y público general',
    icon: Users,
  },
  {
    key: 'estudiante',
    label: 'Estudiante',
    description: 'Registro exclusivo para estudiantes',
    icon: GraduationCap,
  },
  {
    key: 'docente',
    label: 'Docente',
    description: 'Acceso para personal académico',
    icon: School,
  },
  {
    key: 'promotor',
    label: 'Promotor',
    description: 'Registro para aliados estratégicos',
    icon: Briefcase,
  },
];

const UserTypeSelect: React.FC = () => {
  const navigate = useNavigate();

  const handleSelect = (type: UserType['key']): void => {
    if (type === 'visitante') {
      navigate('/register/visitante');
    } else {
      navigate(`/register?type=${type}`);
    }
  };

  return (
    <div className="user-type-container">
      <div className="user-type-box">
        <button 
          onClick={() => navigate('/login')} 
          className="back-button"
          type="button"
        >
          <ArrowLeft size={20} className="arrow-icon" />
          <span>Volver</span>
        </button>

        <h1 className="user-type-title">
          Selecciona tu tipo de usuario
        </h1>
        <p className="user-type-subtitle">
          Elige el tipo de usuario que mejor se adapte a tu rol para acceder al portal
        </p>

        <div className="user-type-grid">
          {userTypes.map((type) => {
            const Icon = type.icon;
            return (
              <div
                key={type.key}
                className="user-type-card"
                onClick={() => handleSelect(type.key)}
                role="button"
                tabIndex={0}
                onKeyDown={(e: React.KeyboardEvent) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    handleSelect(type.key);
                  }
                }}
              >
                <div className="user-type-icon">
                  <Icon size={24} />
                </div>
                <h2 className="user-type-label">{type.label}</h2>
                <p className="user-type-description">{type.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default UserTypeSelect;
