import React from 'react';
import { Check, X } from 'lucide-react';

interface DomainListProps {
  domains: string[];
  availableDomains: Set<string>;
  checkedDomains: Set<string>;
}

export function DomainList({ domains, availableDomains, checkedDomains }: DomainListProps) {
  return (
    <div className="mt-6">
      <h3 className="text-lg font-semibold mb-3">Generated Domains</h3>
      <div className="grid gap-2">
        {domains.map((domain) => (
          <div
            key={domain}
            className="flex items-center justify-between p-3 bg-white rounded-lg shadow-sm"
          >
            <span className="font-mono">{domain}</span>
            {checkedDomains.has(domain) && (
              availableDomains.has(domain) ? (
                <div className="flex items-center text-green-600">
                  <Check className="h-5 w-5 mr-1" />
                  <span>Available</span>
                </div>
              ) : (
                <div className="flex items-center text-red-600">
                  <X className="h-5 w-5 mr-1" />
                  <span>Taken</span>
                </div>
              )
            )}
          </div>
        ))}
      </div>
    </div>
  );
}