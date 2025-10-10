import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Navbar from '../components/layout/Navbar';
import EducationHero from '../components/education/EducationHero';
import EducationTabs from '../components/education/EducationTabs';
import ActivityCard from '../components/education/ActivityCard';
import MaterialCard from '../components/education/MaterialCard';
import ArticleCard from '../components/education/ArticleCard';
import TrainingCard from '../components/education/TrainingCard';
import EducationFooterCTA from '../components/education/EducationFooterCTA';
import { educationMockData } from './educationMockData';
import { TabType } from '../types/education';

const EducationPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<TabType>(TabType.ACTIVIDADES);

  // Sync tab with URL
  useEffect(() => {
    const path = location.pathname;
    if (path.includes('/actividades')) {
      setActiveTab(TabType.ACTIVIDADES);
    } else if (path.includes('/material-academico')) {
      setActiveTab(TabType.MATERIAL);
    } else if (path.includes('/articulos-cientificos')) {
      setActiveTab(TabType.ARTICULOS);
    } else if (path.includes('/capacitaciones')) {
      setActiveTab(TabType.CAPACITACIONES);
    }
  }, [location.pathname]);

  const handleTabChange = (tab: TabType) => {
    setActiveTab(tab);
    // Update URL based on tab
    const tabRoutes = {
      [TabType.ACTIVIDADES]: '/educacion/actividades',
      [TabType.MATERIAL]: '/educacion/material-academico',
      [TabType.ARTICULOS]: '/educacion/articulos-cientificos',
      [TabType.CAPACITACIONES]: '/educacion/capacitaciones',
    };
    navigate(tabRoutes[tab]);
  };

  const handleReserveActivity = (activityId: number) => {
    console.log('Reservar actividad:', activityId);
    // TODO: Implement reservation logic
  };

  const handleDownloadMaterial = (materialId: number) => {
    console.log('Descargar material:', materialId);
    // TODO: Implement download logic
  };

  const handleReadArticle = (articleId: number) => {
    console.log('Leer artículo:', articleId);
    // TODO: Implement article reading logic
  };

  const handleViewTraining = (trainingId: number) => {
    console.log('Ver capacitación:', trainingId);
    // TODO: Implement training view logic
  };

  const handleLocationClick = () => {
    console.log('Ver ubicación del parque');
    // TODO: Navigate to location page or open map
  };

  const handleScheduleClick = () => {
    console.log('Agendar visita');
    navigate('/contacto');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 via-emerald-50 to-teal-50">
      <Navbar onLogin={() => navigate('/login')} />
      
      <EducationHero />
      
      <EducationTabs activeTab={activeTab} onTabChange={handleTabChange} />

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Actividades Tab */}
        {activeTab === TabType.ACTIVIDADES && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {educationMockData.activities.map((activity) => (
              <ActivityCard
                key={activity.id}
                activity={activity}
                onReserve={handleReserveActivity}
              />
            ))}
          </div>
        )}

        {/* Material Académico Tab */}
        {activeTab === TabType.MATERIAL && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {educationMockData.materials.map((material) => (
              <MaterialCard
                key={material.id}
                material={material}
                onDownload={handleDownloadMaterial}
              />
            ))}
          </div>
        )}

        {/* Artículos Científicos Tab */}
        {activeTab === TabType.ARTICULOS && (
          <div className="space-y-6">
            {educationMockData.articles.map((article) => (
              <ArticleCard
                key={article.id}
                article={article}
                onReadArticle={handleReadArticle}
              />
            ))}
          </div>
        )}

        {/* Capacitaciones Tab */}
        {activeTab === TabType.CAPACITACIONES && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {educationMockData.trainings.map((training) => (
              <TrainingCard
                key={training.id}
                training={training}
                onView={handleViewTraining}
              />
            ))}
          </div>
        )}
      </div>

      <EducationFooterCTA
        onLocationClick={handleLocationClick}
        onScheduleClick={handleScheduleClick}
      />
    </div>
  );
};

export default EducationPage;