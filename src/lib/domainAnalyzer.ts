import { DomainStats, WordAnalysis } from './types';
import { analyzeWord } from './wordAnalyzer';

export function analyzeDomains(words: string[]): DomainStats {
  const analyses: WordAnalysis[] = words.map(analyzeWord);
  
  const nouns = analyses
    .filter(a => a.type === 'noun')
    .map(a => a.word);
    
  const pronouns = analyses
    .filter(a => a.type === 'pronoun')
    .map(a => a.word);
    
  const brandableWords = analyses
    .filter(a => a.type === 'brandable')
    .map(a => a.word);

  // Calculate potential value based on word analysis
  const highValueCount = analyses.filter(a => a.potentialValue === 'high').length;
  const potentialValue = 
    highValueCount > words.length * 0.3 ? 'high' :
    highValueCount > words.length * 0.1 ? 'medium' : 'low';

  return {
    totalDomains: words.length,
    nouns,
    pronouns,
    brandableWords,
    potentialValue
  };
}