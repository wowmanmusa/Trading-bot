import React from 'react';
import { AlertTriangle, X } from 'lucide-react';

const NotificationBar = ({ notifications, onDismiss }) => {
  return (
    <div className="mb-6 space-y-2">
      {notifications.map(notification => (
        <div 
          key={notification.id} 
          className="bg-yellow-900/20 border border-yellow-700 rounded-lg p-3 flex items-center animate-slide-in"
        >
          <AlertTriangle className="w-5 h-5 text-yellow-500 mr-3 flex-shrink-0" />
          <span className="flex-1">{notification.message}</span>
          <span className="text-gray-400 text-sm mr-3">
            {new Date(notification.timestamp).toLocaleTimeString()}
          </span>
          {onDismiss && (
            <button
              onClick={() => onDismiss(notification.id)}
              className="text-gray-400 hover:text-white transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      ))}
    </div>
  );
};

export default NotificationBar;