import { WordAnalysis } from './types';

// Common pronouns list
const pronouns = new Set(['i', 'you', 'he', 'she', 'it', 'we', 'they', 'me', 'him', 'her', 'us', 'them']);

// Common nouns that make good domain names
const valuableNouns = new Set(['tech', 'cloud', 'app', 'web', 'net', 'data', 'code', 'dev', 'ai', 'crypto']);

export function analyzeWord(word: string): WordAnalysis {
  const lowerWord = word.toLowerCase();
  
  // Check if it's a pronoun
  if (pronouns.has(lowerWord)) {
    return {
      word,
      type: 'pronoun',
      potentialValue: 'low'
    };
  }

  // Check if it's a valuable noun
  if (valuableNouns.has(lowerWord)) {
    return {
      word,
      type: 'noun',
      potentialValue: 'high'
    };
  }

  // Evaluate brandability
  const isBrandable = (
    word.length >= 3 && 
    word.length <= 8 && 
    /^[a-z]+$/i.test(word) && 
    !word.includes('q') && 
    !word.includes('x') &&
    !word.includes('z')
  );

  if (isBrandable) {
    return {
      word,
      type: 'brandable',
      potentialValue: word.length <= 6 ? 'high' : 'medium'
    };
  }

  return {
    word,
    type: 'other',
    potentialValue: 'low'
  };
}