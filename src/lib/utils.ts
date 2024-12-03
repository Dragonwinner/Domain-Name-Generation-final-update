import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function extractWords(
  text: string,
  minLength: number,
  maxLength: number,
  useExactWords: boolean
): string[] {
  const words = text
    .toLowerCase()
    .replace(/[^a-z\s]/g, '')
    .split(/\s+/)
    .filter(word => word.length >= minLength && word.length <= maxLength);

  return useExactWords ? words : words.filter(word => !commonWords.includes(word));
}

export function generateDomainNames(
  words: string[],
  tlds: string[],
  minLength: number,
  maxLength: number,
  useExactWords: boolean,
  includeNoTLD: boolean = false
): string[] {
  const domains: string[] = [];
  
  for (const word of words) {
    // Add domain without TLD if requested
    if (includeNoTLD && word.length >= minLength && word.length <= maxLength) {
      domains.push(word);
    }

    // Add domains with TLDs
    for (const tld of tlds) {
      // Base domain
      if (word.length >= minLength && word.length <= maxLength) {
        domains.push(`${word}${tld}`);
      }
      
      if (!useExactWords) {
        // With 'my' prefix
        const myDomain = `my${word}`;
        if (myDomain.length >= minLength && myDomain.length <= maxLength) {
          domains.push(`${myDomain}${tld}`);
        }
        
        // With 'get' prefix
        const getDomain = `get${word}`;
        if (getDomain.length >= minLength && getDomain.length <= maxLength) {
          domains.push(`${getDomain}${tld}`);
        }
        
        // With 'app' suffix
        const appDomain = `${word}app`;
        if (appDomain.length >= minLength && appDomain.length <= maxLength) {
          domains.push(`${appDomain}${tld}`);
        }
      }
    }
  }
  
  return [...new Set(domains)];
}

export function validateTLD(tld: string): boolean {
  // Allow both single-level and multi-level TLDs
  const tldPattern = /^(\.[a-z]+)+$/;
  return tldPattern.test(tld);
}

export function exportDomains(domains: string[], format: 'csv' | 'json' | 'txt'): void {
  let content: string;
  let mimeType: string;
  let extension: string;

  switch (format) {
    case 'csv':
      content = 'Domain\n' + domains.join('\n');
      mimeType = 'text/csv';
      extension = 'csv';
      break;
    case 'json':
      content = JSON.stringify({ domains }, null, 2);
      mimeType = 'application/json';
      extension = 'json';
      break;
    case 'txt':
      content = domains.join('\n');
      mimeType = 'text/plain';
      extension = 'txt';
      break;
  }

  const blob = new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `domains.${extension}`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

const commonWords = [
  'the', 'be', 'to', 'of', 'and', 'a', 'in', 'that', 'have', 'i',
  'it', 'for', 'not', 'on', 'with', 'he', 'as', 'you', 'do', 'at'
];