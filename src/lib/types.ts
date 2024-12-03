export interface DomainStats {
  totalDomains: number;
  nouns: string[];
  pronouns: string[];
  brandableWords: string[];
  potentialValue: 'high' | 'medium' | 'low';
}

export interface WordAnalysis {
  word: string;
  type: 'noun' | 'pronoun' | 'brandable' | 'other';
  potentialValue: 'high' | 'medium' | 'low';
}