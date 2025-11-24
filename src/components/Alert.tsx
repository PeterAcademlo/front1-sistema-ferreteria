import React from 'react';

interface AlertProps {
  type: 'success' | 'danger';
  message: string;
}

const Alert: React.FC<AlertProps> = ({ type, message }) => {
  const getAlertStyles = () => {
    switch (type) {
      case 'success':
        return 'bg-green-100 border-green-400 text-green-700';
      case 'danger':
        return 'bg-red-100 border-red-400 text-red-700';
      default:
        return 'bg-blue-100 border-blue-400 text-blue-700';
    }
  };

  const getIcon = () => {
    switch (type) {
      case 'success':
        return 'bx bx-check-circle text-green-500';
      case 'danger':
        return 'bx bx-error-circle text-red-500';
      default:
        return 'bx bx-info-circle text-blue-500';
    }
  };

  return (
    <div className={`fixed top-4 right-4 z-50 border-l-4 rounded-lg shadow-lg p-4 max-w-sm ${getAlertStyles()} transition-all duration-300 transform translate-x-0`}>
      <div className="flex items-center">
        <i className={`${getIcon()} text-xl mr-3`}></i>
        <div className="flex-1">
          <p className="font-medium">{message}</p>
        </div>
        
      </div>
    </div>
  );
};

export default Alert;