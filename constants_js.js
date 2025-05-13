// Application constants

export const FILTER_OPTIONS = {
  ALL: 'ALL',
  BLOCKS: 'BLOCKS',
  DARKPOOL: 'DARKPOOL',
  SWEEPS: 'SWEEPS',
  BULLISH: 'BULLISH',
  BEARISH: 'BEARISH'
};

export const ORDER_TYPES = {
  CALL: 'CALL',
  PUT: 'PUT',
  STOCK: 'STOCK'
};

export const SENTIMENT_TYPES = {
  BULLISH: 'BULLISH',
  BEARISH: 'BEARISH',
  NEUTRAL: 'NEUTRAL'
};

export const WEBSOCKET_EVENTS = {
  CONNECT: 'connect',
  DISCONNECT: 'disconnect',
  ORDER_FLOW: 'order_flow',
  NOTIFICATION: 'notification',
  ERROR: 'error'
};

export const API_ENDPOINTS = {
  ORDER_FLOW: '/api/orderflow',
  HISTORICAL: '/api/historical',
  SYMBOLS: '/api/symbols',
  NOTIFICATIONS: '/api/notifications',
  AUTH: '/api/auth'
};

export const THEME = {
  colors: {
    primary: '#3b82f6',
    success: '#22c55e',
    danger: '#ef4444',
    warning: '#f59e0b',
    info: '#06b6d4',
    dark: '#111827',
    light: '#f3f4f6'
  },
  breakpoints: {
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
    '2xl': '1536px'
  }
};

export const NOTIFICATION_SEVERITY = {
  LOW: 'low',
  MEDIUM: 'medium',
  HIGH: 'high',
  CRITICAL: 'critical'
};

export const MOCK_DATA_INTERVAL = 2000; // milliseconds
export const MAX_ORDERS_DISPLAY = 100;
export const MAX_NOTIFICATIONS = 5;