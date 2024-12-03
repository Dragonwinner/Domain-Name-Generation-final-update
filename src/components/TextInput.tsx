import React from 'react';
import { cn } from '../lib/utils';

interface TextInputProps {
  value: string;
  onChange: (value: string) => void;
  className?: string;
}

export function TextInput({ value, onChange, className }: TextInputProps) {
  return (
    <textarea
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder="Paste your text here..."
      className={cn(
        'w-full h-32 p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500',
        'placeholder-gray-400 resize-none',
        className
      )}
    />
  );
}