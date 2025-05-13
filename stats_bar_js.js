import React from 'react';
import { DollarSign, TrendingUp, TrendingDown, BarChart3 } from 'lucide-react';
import { formatCurrency } from '../utils/formatters';

const StatsBar = ({ stats }) => {
  const statItems = [
    {
      title: 'Total Volume',
      value: formatCurrency(stats.totalVolume),
      icon: DollarSign,
      iconColor: 'text-green-500',
      bgColor: 'bg-gray-700'
    },
    {
      title: 'Bullish Flow',
      value: formatCurrency(stats.bullishFlow),
      icon: TrendingUp,
      iconColor: 'text-green-500',
      bgColor: 'bg-gray-700',
      textColor: 'text-green-500'
    },
    {
      title: 'Bearish Flow',
      value: formatCurrency(stats.bearishFlow),
      icon: TrendingDown,
      iconColor: 'text-red-500',
      bgColor: 'bg-gray-700',
      textColor: 'text-red-500'
    },
    {
      title: 'Darkpool Volume',
      value: formatCurrency(stats.darkpoolVolume),
      icon: BarChart3,
      iconColor: 'text-purple-500',
      bgColor: 'bg-gray-700',
      textColor: 'text-purple-500'
    }
  ];

  return (
    <div className="bg-gray-800 border-b border-gray-700">
      <div className="container mx-auto px-4 py-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {statItems.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div key={index} className={`${stat.bgColor} rounded-lg p-4`}>
                <div className="flex items-center justify-between">
                  <span className="text-gray-400 text-sm">{stat.title}</span>
                  <Icon className={`w-5 h-5 ${stat.iconColor}`} />
                </div>
                <div className={`mt-2 text-2xl font-bold ${stat.textColor || 'text-white'}`}>
                  {stat.value}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default StatsBar;