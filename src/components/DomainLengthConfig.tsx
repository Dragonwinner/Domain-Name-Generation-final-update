import React from 'react';
import { cn } from '../lib/utils';

interface DomainLengthConfigProps {
  minLength: number;
  maxLength: number;
  onMinLengthChange: (value: number) => void;
  onMaxLengthChange: (value: number) => void;
}

export function DomainLengthConfig({
  minLength,
  maxLength,
  onMinLengthChange,
  onMaxLengthChange,
}: DomainLengthConfigProps) {
  return (
    <div className="space-y-4">
      <div className="flex gap-4">
        <div className="flex-1">
          <label htmlFor="minLength" className="block text-sm font-medium text-gray-700 mb-1">
            Minimum Length
          </label>
          <input
            type="number"
            id="minLength"
            value={minLength}
            onChange={(e) => onMinLengthChange(Math.max(1, parseInt(e.target.value) || 1))}
            min="1"
            max={maxLength}
            className={cn(
              'w-full p-2 border rounded-lg',
              'focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
            )}
          />
        </div>
        <div className="flex-1">
          <label htmlFor="maxLength" className="block text-sm font-medium text-gray-700 mb-1">
            Maximum Length
          </label>
          <input
            type="number"
            id="maxLength"
            value={maxLength}
            onChange={(e) => onMaxLengthChange(Math.max(minLength, parseInt(e.target.value) || minLength))}
            min={minLength}
            className={cn(
              'w-full p-2 border rounded-lg',
              'focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
            )}
          />
        </div>
      </div>
      <p className="text-sm text-gray-500">
        Domain length excludes TLD (e.g., for "example.com", length is 7)
      </p>
    </div>
  );
}