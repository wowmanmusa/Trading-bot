// Custom hook for WebSocket connection

import { useState, useEffect, useRef, useCallback } from 'react';
import WebSocketManager from '../utils/websocket';
import { WEBSOCKET_EVENTS } from '../utils/constants';

const useWebSocket = (url, autoConnect = true) => {
  const [isConnected, setIsConnected] = useState(false);
  const [lastMessage, setLastMessage] = useState(null);
  const [error, setError] = useState(null);
  const wsManager = useRef(null);

  useEffect(() => {
    if (!url || !autoConnect) return;

    // Create WebSocket manager instance
    wsManager.current = new WebSocketManager(url);

    // Set up event listeners
    wsManager.current.on(WEBSOCKET_EVENTS.CONNECT, () => {
      setIsConnected(true);
      setError(null);
    });

    wsManager.current.on(WEBSOCKET_EVENTS.DISCONNECT, () => {
      setIsConnected(false);
    });

    wsManager.current.on(WEBSOCKET_EVENTS.ERROR, (error) => {
      setError(error);
    });

    wsManager.current.on(WEBSOCKET_EVENTS.ORDER_FLOW, (data) => {
      setLastMessage({ type: WEBSOCKET_EVENTS.ORDER_FLOW, data });
    });

    wsManager.current.on(WEBSOCKET_EVENTS.NOTIFICATION, (data) => {
      setLastMessage({ type: WEBSOCKET_EVENTS.NOTIFICATION, data });
    });

    // Connect to WebSocket
    wsManager.current.connect();

    // Cleanup on unmount
    return () => {
      if (wsManager.current) {
        wsManager.current.disconnect();
      }
    };
  }, [url, autoConnect]);

  // Send message through WebSocket
  const sendMessage = useCallback((message) => {
    if (wsManager.current) {
      wsManager.current.send(message);
    }
  }, []);

  // Manual connect/disconnect
  const connect = useCallback(() => {
    if (wsManager.current) {
      wsManager.current.connect();
    }
  }, []);

  const disconnect = useCallback(() => {
    if (wsManager.current) {
      wsManager.current.disconnect();
    }
  }, []);

  return {
    isConnected,
    lastMessage,
    error,
    sendMessage,
    connect,
    disconnect
  };
};

export default useWebSocket;