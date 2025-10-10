import React, { ReactNode } from 'react';
import { X } from 'lucide-react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
  className?: string;
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  children,
  className = '',
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black/50"
        onClick={onClose}
        role="presentation"
      />
      
      {/* Modal Content */}
      <div className={`
        relative
        w-full
        max-w-md
        bg-white
        rounded-lg
        shadow-lg
        p-6
        dark:bg-gray-800
        ${className}
      `}>
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold dark:text-white">
            {title}
          </h2>
          <button
            onClick={onClose}
            className="btn p-1 bg-transparent text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
            type="button"
            aria-label="Cerrar modal"
          >
            <X className="w-5 h-5 text-current" />
          </button>
        </div>

        {/* Body */}
        <div>
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;