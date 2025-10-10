import React from 'react';
import { useAuth } from '../hooks/useAuth';
import { User } from '../types/user';
import Button from '../components/ui/Button';

interface DashboardProps {}

interface DashboardStats {
  totalVisits: number;
  currentVisitors: number;
  upcomingEvents: number;
  activePromotions: number;
}

const Dashboard: React.FC<DashboardProps> = () => {
  const { user } = useAuth();

  const stats: DashboardStats = {
    totalVisits: 1234,
    currentVisitors: 50,
    upcomingEvents: 3,
    activePromotions: 5
  };

  const renderWelcomeMessage = (user: User | null): string => {
    if (!user) return 'Bienvenido al Dashboard';
    const hour = new Date().getHours();
    const greeting = hour < 12 ? 'Buenos días' : hour < 18 ? 'Buenas tardes' : 'Buenas noches';
    return `${greeting}, ${user.name}`;
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">
        {renderWelcomeMessage(user)}
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard
          title="Visitas Totales"
          value={stats.totalVisits}
          description="Visitas registradas este mes"
        />
        <StatCard
          title="Visitantes Actuales"
          value={stats.currentVisitors}
          description="Personas en el parque"
        />
        <StatCard
          title="Próximos Eventos"
          value={stats.upcomingEvents}
          description="Eventos programados"
        />
        <StatCard
          title="Promociones Activas"
          value={stats.activePromotions}
          description="Ofertas disponibles"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <QuickActions />
        <RecentActivity />
      </div>
    </div>
  );
};

interface StatCardProps {
  title: string;
  value: number;
  description: string;
}

const StatCard: React.FC<StatCardProps> = ({ title, value, description }) => (
  <div className="bg-white rounded-lg shadow p-6">
    <h3 className="text-gray-500 text-sm uppercase font-medium">{title}</h3>
    <p className="text-3xl font-bold mt-2">{value}</p>
    <p className="text-gray-600 text-sm mt-1">{description}</p>
  </div>
);

const QuickActions: React.FC = () => (
  <div className="bg-white rounded-lg shadow p-6">
    <h2 className="text-xl font-semibold mb-4">Acciones Rápidas</h2>
    <div className="grid grid-cols-2 gap-4">
      <Button variant="outline" onClick={() => console.log('Registrar visita')}>
        Registrar Visita
      </Button>
      <Button variant="outline" onClick={() => console.log('Crear evento')}>
        Crear Evento
      </Button>
      <Button variant="outline" onClick={() => console.log('Ver reportes')}>
        Ver Reportes
      </Button>
      <Button variant="outline" onClick={() => console.log('Configuración')}>
        Configuración
      </Button>
    </div>
  </div>
);

interface ActivityItem {
  id: string;
  type: 'visita' | 'evento' | 'promocion';
  description: string;
  timestamp: string;
}

const RecentActivity: React.FC = () => {
  const activities: ActivityItem[] = [
    {
      id: '1',
      type: 'visita',
      description: 'Nueva visita registrada',
      timestamp: '2 minutos atrás'
    },
    {
      id: '2',
      type: 'evento',
      description: 'Evento "Día Familiar" creado',
      timestamp: '1 hora atrás'
    },
    {
      id: '3',
      type: 'promocion',
      description: 'Nueva promoción agregada',
      timestamp: '3 horas atrás'
    }
  ];

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-xl font-semibold mb-4">Actividad Reciente</h2>
      <div className="space-y-4">
        {activities.map((activity) => (
          <div key={activity.id} className="flex items-start space-x-3 p-3 hover:bg-gray-50 rounded-lg">
            <div className="flex-grow">
              <p className="text-sm font-medium">{activity.description}</p>
              <p className="text-xs text-gray-500">{activity.timestamp}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;