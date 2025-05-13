import React from 'react';
import { Clock, TrendingUp, TrendingDown } from 'lucide-react';
import { formatCurrency } from '../utils/formatters';
import clsx from 'clsx';

const OrderFlowTable = ({ orders }) => {
  return (
    <div className="bg-gray-800 rounded-lg overflow-hidden shadow-lg">
      <div className="p-4 border-b border-gray-700">
        <h2 className="text-xl font-semibold">Real-Time Order Flow</h2>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-700">
            <tr>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-300">Time</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-300">Symbol</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-300">Type</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-300">Strike/Exp</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-300">Volume</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-300">Price</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-300">Total Value</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-300">Sentiment</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-300">Flags</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-700">
            {orders.map((order) => (
              <tr key={order.id} className="hover:bg-gray-700/50 transition-colors">
                <td className="px-4 py-3 text-sm">
                  <div className="flex items-center">
                    <Clock className="w-4 h-4 text-gray-400 mr-1" />
                    {new Date(order.timestamp).toLocaleTimeString()}
                  </div>
                </td>
                <td className="px-4 py-3 text-sm">
                  <span className="font-bold text-white">{order.symbol}</span>
                </td>
                <td className="px-4 py-3 text-sm">
                  <span className={clsx(
                    'px-2 py-1 rounded text-xs font-medium',
                    {
                      'bg-green-900 text-green-300': order.type === 'CALL',
                      'bg-red-900 text-red-300': order.type === 'PUT',
                      'bg-gray-700 text-gray-300': order.type === 'STOCK'
                    }
                  )}>
                    {order.type}
                  </span>
                </td>
                <td className="px-4 py-3 text-sm">
                  {order.type !== 'STOCK' && `$${order.strike} ${order.expiration}`}
                </td>
                <td className="px-4 py-3 text-sm">
                  {order.volume.toLocaleString()}
                </td>
                <td className="px-4 py-3 text-sm">
                  ${order.price}
                </td>
                <td className="px-4 py-3 text-sm font-bold">
                  {formatCurrency(order.totalValue)}
                </td>
                <td className="px-4 py-3 text-sm">
                  <span className={clsx('flex items-center', {
                    'text-green-500': order.sentiment === 'BULLISH',
                    'text-red-500': order.sentiment === 'BEARISH',
                    'text-gray-400': order.sentiment === 'NEUTRAL'
                  })}>
                    {order.sentiment === 'BULLISH' && <TrendingUp className="w-4 h-4 mr-1" />}
                    {order.sentiment === 'BEARISH' && <TrendingDown className="w-4 h-4 mr-1" />}
                    {order.sentiment}
                  </span>
                </td>
                <td className="px-4 py-3 text-sm">
                  <div className="flex space-x-1">
                    {order.isBlock && (
                      <span className="px-2 py-1 bg-blue-900 text-blue-300 rounded text-xs">BLOCK</span>
                    )}
                    {order.isDarkpool && (
                      <span className="px-2 py-1 bg-purple-900 text-purple-300 rounded text-xs">DARK</span>
                    )}
                    {order.isSweep && (
                      <span className="px-2 py-1 bg-orange-900 text-orange-300 rounded text-xs">SWEEP</span>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OrderFlowTable;