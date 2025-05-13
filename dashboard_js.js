import React, { useState, useEffect } from 'react';
import { Activity, Bell } from 'lucide-react';
import StatsBar from './StatsBar';
import FilterBar from './FilterBar';
import OrderFlowTable from './OrderFlowTable';
import NotificationBar from './NotificationBar';
import Chart from './Chart';
import { generateMockOrderFlow } from '../utils/dataGenerator';
import { formatCurrency } from '../utils/formatters';
import useOrderFlow from '../hooks/useOrderFlow';

const Dashboard = () => {
  const {
    orderFlow,
    filteredFlow,
    selectedFilter,
    setSelectedFilter,
    searchTerm,
    setSearchTerm,
    notifications,
    stats
  } = useOrderFlow();

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Header */}
      <header className="bg-gray-800 border-b border-gray-700">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Activity className="w-8 h-8 text-blue-500" />
              <h1 className="text-2xl font-bold">SmartFlow Pro</h1>
            </div>
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Bell className="w-6 h-6 text-gray-400 hover:text-white cursor-pointer" />
                {notifications.length > 0 && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full text-xs flex items-center justify-center">
                    {notifications.length}
                  </span>
                )}
              </div>
              <button className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg text-sm font-medium transition-colors">
                Upgrade to Premium
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Stats Bar */}
      <StatsBar stats={stats} />

      {/* Main Content */}
      <div className="container mx-auto px-4 py-6">
        {/* Notifications */}
        {notifications.length > 0 && (
          <NotificationBar notifications={notifications} />
        )}

        {/* Filters */}
        <FilterBar
          selectedFilter={selectedFilter}
          setSelectedFilter={setSelectedFilter}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
        />

        {/* Charts Section */}
        <div className="mb-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Chart
            title="Bullish vs Bearish Flow"
            data={[stats.bullishFlow, stats.bearishFlow]}
            labels={['Bullish', 'Bearish']}
            type="doughnut"
          />
          <Chart
            title="Order Type Distribution"
            data={[
              filteredFlow.filter(o => o.isBlock).length,
              filteredFlow.filter(o => o.isDarkpool).length,
              filteredFlow.filter(o => o.isSweep).length,
              filteredFlow.filter(o => !o.isBlock && !o.isDarkpool && !o.isSweep).length
            ]}
            labels={['Blocks', 'Darkpool', 'Sweeps', 'Regular']}
            type="bar"
          />
        </div>

        {/* Order Flow Table */}
        <OrderFlowTable orders={filteredFlow} />
      </div>
    </div>
  );
};

export default Dashboard;