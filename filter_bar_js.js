import React from 'react';
import { Filter, Search } from 'lucide-react';

const FilterBar = ({ selectedFilter, setSelectedFilter, searchTerm, setSearchTerm }) => {
  const filters = [
    { value: 'ALL', label: 'All Orders' },
    { value: 'BLOCKS', label: 'Block Trades' },
    { value: 'DARKPOOL', label: 'Darkpool' },
    { value: 'SWEEPS', label: 'Sweeps' },
    { value: 'BULLISH', label: 'Bullish' },
    { value: 'BEARISH', label: 'Bearish' }
  ];

  return (
    <div className="mb-6 flex flex-col sm:flex-row gap-4">
      <div className="flex items-center space-x-2">
        <Filter className="w-5 h-5 text-gray-400" />
        <select 
          value={selectedFilter}
          onChange={(e) => setSelectedFilter(e.target.value)}
          className="bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {filters.map(filter => (
            <option key={filter.value} value={filter.value}>
              {filter.label}
            </option>
          ))}
        </select>
      </div>
      
      <div className="flex-1">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search symbol..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-gray-700 border border-gray-600 rounded-lg pl-10 pr-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>
    </div>
  );
};

export default FilterBar;