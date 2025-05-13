// Custom hook for managing order flow data

import { useState, useEffect, useCallback } from 'react';
import { generateMockOrderFlow, generateMockNotification } from '../utils/dataGenerator';
import { FILTER_OPTIONS, MOCK_DATA_INTERVAL, MAX_ORDERS_DISPLAY, MAX_NOTIFICATIONS } from '../utils/constants';
import useWebSocket from './useWebSocket';
import api from '../services/api';

const useOrderFlow = () => {
  const [orderFlow, setOrderFlow] = useState([]);
  const [filteredFlow, setFilteredFlow] = useState([]);
  const [selectedFilter, setSelectedFilter] = useState(FILTER_OPTIONS.ALL);
  const [searchTerm, setSearchTerm] = useState('');
  const [notifications, setNotifications] = useState([]);
  const [stats, setStats] = useState({
    totalVolume: 0,
    bullishFlow: 0,
    bearishFlow: 0,
    darkpoolVolume: 0
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Mock data mode from environment
  const useMockData = process.env.REACT_APP_ENABLE_MOCK_DATA === 'true';

  // WebSocket for real-time data
  const { isConnected, lastMessage } = useWebSocket(
    process.env.REACT_APP_WEBSOCKET_URL,
    !useMockData
  );

  // Handle new order from WebSocket
  useEffect(() => {
    if (lastMessage && lastMessage.type === 'order_flow') {
      handleNewOrder(lastMessage.data);
    }
  }, [lastMessage]);

  // Add new order to the flow
  const handleNewOrder = useCallback((order) => {
    setOrderFlow(prev => [order, ...prev].slice(0, MAX_ORDERS_DISPLAY));
    
    // Check for unusual activity
    if (order.totalValue > 5000000 || order.isSweep || order.isDarkpool) {
      const notification = generateMockNotification(order);
      setNotifications(prev => [notification, ...prev].slice(0, MAX_NOTIFICATIONS));
    }
  }, []);

  // Mock data generation
  useEffect(() => {
    if (!useMockData) return;

    const interval = setInterval(() => {
      const newOrder = generateMockOrderFlow();
      handleNewOrder(newOrder);
    }, MOCK_DATA_INTERVAL);

    return () => clearInterval(interval);
  }, [useMockData, handleNewOrder]);

  // Load initial data
  useEffect(() => {
    const loadInitialData = async () => {
      setIsLoading(true);
      try {
        if (!useMockData) {
          const data = await api.getOrderFlow({ limit: MAX_ORDERS_DISPLAY });
          setOrderFlow(data.orders);
        } else {
          // Generate initial mock data
          const initialOrders = Array(20).fill(null).map(() => generateMockOrderFlow());
          setOrderFlow(initialOrders);
        }
      } catch (err) {
        setError(err.message);
        console.error('Error loading order flow:', err);
      } finally {
        setIsLoading(false);
      }
    };

    loadInitialData();
  }, [useMockData]);

  // Filter orders
  useEffect(() => {
    let filtered = orderFlow;
    
    if (selectedFilter !== FILTER_OPTIONS.ALL) {
      filtered = filtered.filter(order => {
        switch (selectedFilter) {
          case FILTER_OPTIONS.BLOCKS:
            return order.isBlock;
          case FILTER_OPTIONS.DARKPOOL:
            return order.isDarkpool;
          case FILTER_OPTIONS.SWEEPS:
            return order.isSweep;
          case FILTER_OPTIONS.BULLISH:
            return order.sentiment === 'BULLISH';
          case FILTER_OPTIONS.BEARISH:
            return order.sentiment === 'BEARISH';
          default:
            return true;
        }
      });
    }
    
    if (searchTerm) {
      filtered = filtered.filter(order => 
        order.symbol.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    setFilteredFlow(filtered);
  }, [orderFlow, selectedFilter, searchTerm]);

  // Calculate statistics
  useEffect(() => {
    const totalVolume = orderFlow.reduce((sum, order) => sum + order.totalValue, 0);
    const bullishFlow = orderFlow
      .filter(o => o.sentiment === 'BULLISH')
      .reduce((sum, o) => sum + o.totalValue, 0);
    const bearishFlow = orderFlow
      .filter(o => o.sentiment === 'BEARISH')
      .reduce((sum, o) => sum + o.totalValue, 0);
    const darkpoolVolume = orderFlow
      .filter(o => o.isDarkpool)
      .reduce((sum, o) => sum + o.totalValue, 0);
    
    setStats({ totalVolume, bullishFlow, bearishFlow, darkpoolVolume });
  }, [orderFlow]);

  // Dismiss notification
  const dismissNotification = useCallback((notificationId) => {
    setNotifications(prev => prev.filter(n => n.id !== notificationId));
  }, []);

  return {
    orderFlow,
    filteredFlow,
    selectedFilter,
    setSelectedFilter,
    searchTerm,
    setSearchTerm,
    notifications,
    dismissNotification,
    stats,
    isLoading,
    error,
    isConnected
  };
};

export default useOrderFlow;