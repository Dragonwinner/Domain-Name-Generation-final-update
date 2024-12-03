import React from 'react';
import { Plus, X } from 'lucide-react';
import { cn } from '../lib/utils';
import { validateTLD } from '../lib/utils';

interface TldSelectorProps {
  tlds: string[];
  onAddTld: (tld: string) => void;
  onRemoveTld: (tld: string) => void;
  includeNoTLD: boolean;
  onIncludeNoTLDChange: (value: boolean) => void;
}

export function TldSelector({ 
  tlds, 
  onAddTld, 
  onRemoveTld, 
  includeNoTLD,
  onIncludeNoTLDChange 
}: TldSelectorProps) {
  const [newTld, setNewTld] = React.useState('');
  const [error, setError] = React.useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formattedTld = newTld.startsWith('.') ? newTld.toLowerCase() : `.${newTld.toLowerCase()}`;
    
    if (!validateTLD(formattedTld)) {
      setError('Invalid TLD format. Use format like .com or .co.in');
      return;
    }

    if (tlds.includes(formattedTld)) {
      setError('TLD already exists');
      return;
    }

    setError('');
    onAddTld(formattedTld);
    setNewTld('');
  };

  return (
    <div className="space-y-4">
      <form onSubmit={handleSubmit} className="space-y-2">
        <div className="flex gap-2">
          <input
            type="text"
            value={newTld}
            onChange={(e) => {
              setNewTld(e.target.value.replace(/[^a-zA-Z.]/g, ''));
              setError('');
            }}
            placeholder="Enter TLD (e.g. com or co.in)"
            className={cn(
              'flex-1 p-2 border rounded-lg',
              'focus:ring-2 focus:ring-blue-500 focus:border-blue-500',
              error && 'border-red-500'
            )}
          />
          <button
            type="submit"
            className="p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          >
            <Plus className="h-5 w-5" />
          </button>
        </div>
        {error && <p className="text-sm text-red-500">{error}</p>}
      </form>

      <div className="flex items-center space-x-2 mb-4">
        <input
          type="checkbox"
          id="includeNoTLD"
          checked={includeNoTLD}
          onChange={(e) => onIncludeNoTLDChange(e.target.checked)}
          className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
        />
        <label htmlFor="includeNoTLD" className="text-sm font-medium text-gray-700">
          Include domains without TLD
        </label>
      </div>

      <div className="flex flex-wrap gap-2">
        {tlds.map((tld) => (
          <div
            key={tld}
            className="flex items-center gap-2 bg-gray-100 px-3 py-1 rounded-full"
          >
            <span className="text-sm font-medium">{tld}</span>
            <button
              onClick={() => onRemoveTld(tld)}
              className="text-gray-500 hover:text-red-500"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}