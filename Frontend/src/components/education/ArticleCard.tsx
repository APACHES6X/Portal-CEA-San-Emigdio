import { FileText, ExternalLink } from 'lucide-react';
import type { Article } from '../../types/education';

interface ArticleCardProps {
  article: Article;
  onReadArticle?: (articleId: number) => void;
}

const ArticleCard = ({ article, onReadArticle }: ArticleCardProps) => {
  return (
    <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 p-6">
      <div className="flex gap-6">
        {/* Content */}
        <div className="flex-1 space-y-4">
          <h3 className="text-2xl font-bold text-gray-800 leading-tight">
            {article.title}
          </h3>
          
          <p className="text-gray-600 leading-relaxed">
            {article.abstract}
          </p>

          {/* Metadata */}
          <div className="space-y-2 text-sm">
            <div>
              <span className="font-semibold text-gray-700">Autores: </span>
              <span className="text-gray-600">{article.authors.join(', ')}</span>
            </div>
            <div>
              <span className="font-semibold text-gray-700">Revista: </span>
              <span className="text-gray-600">{article.journal}</span>
            </div>
            <div>
              <span className="font-semibold text-gray-700">Año: </span>
              <span className="text-gray-600">{article.year}</span>
            </div>
          </div>

          {/* Read Link */}
          <button
            onClick={() => onReadArticle?.(article.id)}
            className="inline-flex items-center gap-2 text-green-600 hover:text-green-700 font-medium transition-colors duration-200"
          >
            Leer Artículo Completo
            <ExternalLink size={16} />
          </button>
        </div>

        {/* Icon */}
        <div className="flex-shrink-0 hidden md:block">
          <FileText size={48} className="text-green-600" />
        </div>
      </div>
    </div>
  );
};

export default ArticleCard;