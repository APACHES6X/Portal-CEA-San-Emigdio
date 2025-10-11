import { Calendar, BookOpen, FileText, Video } from 'lucide-react';
import { TabType } from '../../types/education';

interface EducationTabsProps {
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
}

const tabs = [
  { id: TabType.ACTIVIDADES, label: 'Actividades', icon: Calendar },
  { id: TabType.MATERIAL, label: 'Material Académico', icon: BookOpen },
  { id: TabType.ARTICULOS, label: 'Artículos Científicos', icon: FileText },
  { id: TabType.CAPACITACIONES, label: 'Capacitaciones', icon: Video },
];

const EducationTabs = ({ activeTab, onTabChange }: EducationTabsProps) => {
  return (
    <div className="sticky top-0 z-30 bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex overflow-x-auto">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            
            return (
              <button
                key={tab.id}
                onClick={() => onTabChange(tab.id)}
                className={`
                  flex items-center gap-2 px-6 py-4 font-medium text-base
                  transition-all duration-200 border-b-4 whitespace-nowrap
                  ${
                    isActive
                      ? 'text-green-700 border-green-600'
                      : 'text-gray-600 border-transparent hover:bg-green-50 hover:text-green-700'
                  }
                `}
              >
                <Icon size={20} />
                <span className="hidden sm:inline">{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default EducationTabs;