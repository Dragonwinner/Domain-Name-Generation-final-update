import React from 'react';
import { cn } from '../lib/utils';

interface WordProcessingConfigProps {
  useExactWords: boolean;
  onUseExactWordsChange: (value: boolean) => void;
}

export function WordProcessingConfig({
  useExactWords,
  onUseExactWordsChange,
}: WordProcessingConfigProps) {
  return (
    <div className="flex items-center space-x-2">
      <input
        type="checkbox"
        id="useExactWords"
        checked={useExactWords}
        onChange={(e) => onUseExactWordsChange(e.target.checked)}
        className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
      />
      <label htmlFor="useExactWords" className="text-sm font-medium text-gray-700">
        Use exact words from input (no prefixes/suffixes)
      </label>
    </div>
  );
}