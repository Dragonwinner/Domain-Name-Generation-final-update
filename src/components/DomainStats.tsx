import React from 'react';
import { DomainStats } from '../lib/types';
import { BarChart, Sparkles, DollarSign } from 'lucide-react';

interface DomainStatsDisplayProps {
  stats: DomainStats;
}

export function DomainStatsDisplay({ stats }: DomainStatsDisplayProps) {
  const getValueColor = (value: 'high' | 'medium' | 'low') => {
    switch (value) {
      case 'high': return 'text-green-600';
      case 'medium': return 'text-yellow-600';
      case 'low': return 'text-red-600';
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="bg-white p-4 rounded-lg shadow-sm">
        <div className="flex items-center gap-2 mb-3">
          <BarChart className="h-5 w-5 text-blue-500" />
          <h3 className="font-semibold">Domain Statistics</h3>
        </div>
        <div className="space-y-2">
          <p className="text-sm text-gray-600">
            Total Domains: <span className="font-semibold">{stats.totalDomains}</span>
          </p>
          <p className="text-sm text-gray-600">
            Nouns: <span className="font-semibold">{stats.nouns.length}</span>
          </p>
          <p className="text-sm text-gray-600">
            Pronouns: <span className="font-semibold">{stats.pronouns.length}</span>
          </p>
        </div>
      </div>

      <div className="bg-white p-4 rounded-lg shadow-sm">
        <div className="flex items-center gap-2 mb-3">
          <Sparkles className="h-5 w-5 text-purple-500" />
          <h3 className="font-semibold">Brandability Analysis</h3>
        </div>
        <div className="space-y-2">
          <p className="text-sm text-gray-600">
            Brandable Words: <span className="font-semibold">{stats.brandableWords.length}</span>
          </p>
          <div className="flex items-center gap-2">
            <DollarSign className="h-4 w-4 text-gray-400" />
            <p className="text-sm text-gray-600">
              Market Potential: 
              <span className={`ml-1 font-semibold ${getValueColor(stats.potentialValue)}`}>
                {stats.potentialValue.toUpperCase()}
              </span>
            </p>
          </div>
        </div>
      </div>

      {stats.brandableWords.length > 0 && (
        <div className="md:col-span-2 bg-white p-4 rounded-lg shadow-sm">
          <h3 className="font-semibold mb-2">Top Brandable Words</h3>
          <div className="flex flex-wrap gap-2">
            {stats.brandableWords.slice(0, 10).map((word) => (
              <span
                key={word}
                className="px-2 py-1 bg-purple-50 text-purple-700 rounded-full text-sm"
              >
                {word}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}