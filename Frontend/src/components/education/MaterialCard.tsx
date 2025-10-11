import { FileText, Download } from 'lucide-react';
import type { Material } from '../../types/education';
import { formatFileSize } from '../../utils/educationFormatters';

interface MaterialCardProps {
  material: Material;
  onDownload?: (materialId: number) => void;
}

const MaterialCard = ({ material, onDownload }: MaterialCardProps) => {
  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Biología':
        return 'bg-blue-100 text-blue-700';
      case 'Agricultura':
        return 'bg-green-100 text-green-700';
      case 'Ecología':
        return 'bg-teal-100 text-teal-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 p-6">
      <div className="flex gap-4">
        {/* Icon */}
        <div className="flex-shrink-0">
          <div className="w-16 h-16 rounded-full bg-red-100 flex items-center justify-center">
            <FileText size={32} className="text-red-600" />
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 space-y-3">
          <h3 className="text-lg font-bold text-gray-800">{material.title}</h3>
          <p className="text-gray-600 text-sm leading-relaxed">
            {material.description}
          </p>

          {/* Metadata */}
          <div className="flex flex-wrap items-center gap-3">
            <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${getCategoryColor(material.category)}`}>
              Categoría: {material.category}
            </span>
            <span className="text-xs text-gray-500">
              Tipo: {material.fileType}
            </span>
            <span className="text-xs text-gray-500">
              Tamaño: {formatFileSize(material.fileSizeMB)}
            </span>
          </div>

          {/* Download Button */}
          <button
            onClick={() => onDownload?.(material.id)}
            className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200 text-sm"
          >
            <Download size={16} />
            Descargar
          </button>
        </div>
      </div>
    </div>
  );
};

export default MaterialCard;