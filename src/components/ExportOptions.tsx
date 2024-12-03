import React from 'react';
import { Download } from 'lucide-react';

interface ExportOptionsProps {
  domains: string[];
  onExport: (format: 'csv' | 'json' | 'txt') => void;
}

export function ExportOptions({ domains, onExport }: ExportOptionsProps) {
  if (domains.length === 0) return null;

  return (
    <div className="flex items-center gap-2">
      <span className="text-sm text-gray-600">Export as:</span>
      <button
        onClick={() => onExport('csv')}
        className="flex items-center gap-1 px-3 py-1 text-sm bg-green-500 text-white rounded-lg hover:bg-green-600"
      >
        <Download className="h-4 w-4" />
        CSV
      </button>
      <button
        onClick={() => onExport('json')}
        className="flex items-center gap-1 px-3 py-1 text-sm bg-blue-500 text-white rounded-lg hover:bg-blue-600"
      >
        <Download className="h-4 w-4" />
        JSON
      </button>
      <button
        onClick={() => onExport('txt')}
        className="flex items-center gap-1 px-3 py-1 text-sm bg-purple-500 text-white rounded-lg hover:bg-purple-600"
      >
        <Download className="h-4 w-4" />
        TXT
      </button>
    </div>
  );
}