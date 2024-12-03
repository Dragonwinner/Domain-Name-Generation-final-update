import React, { useState, useCallback } from 'react';
import { FileUploader } from './components/FileUploader';
import { TextInput } from './components/TextInput';
import { DomainList } from './components/DomainList';
import { TldSelector } from './components/TldSelector';
import { ExportOptions } from './components/ExportOptions';
import { DomainLengthConfig } from './components/DomainLengthConfig';
import { WordProcessingConfig } from './components/WordProcessingConfig';
import { DomainStatsDisplay } from './components/DomainStats';
import { extractWords, generateDomainNames, exportDomains } from './lib/utils';
import { analyzeDomains } from './lib/domainAnalyzer';
import { DomainStats } from './lib/types';
import * as pdfjsLib from 'pdfjs-dist';
import Papa from 'papaparse';

pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;

function App() {
  const [text, setText] = useState('');
  const [domains, setDomains] = useState<string[]>([]);
  const [domainStats, setDomainStats] = useState<DomainStats | null>(null);
  const [availableDomains] = useState<Set<string>>(new Set());
  const [checkedDomains] = useState<Set<string>>(new Set());
  const [tlds, setTlds] = useState<string[]>(['.com', '.io', '.ai', '.app', '.dev']);
  const [minLength, setMinLength] = useState(3);
  const [maxLength, setMaxLength] = useState(15);
  const [useExactWords, setUseExactWords] = useState(false);
  const [includeNoTLD, setIncludeNoTLD] = useState(false);

  const handleFileSelect = async (file: File) => {
    let content = '';

    if (file.type === 'application/pdf') {
      const arrayBuffer = await file.arrayBuffer();
      const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
      
      for (let i = 1; i <= pdf.numPages; i++) {
        const page = await pdf.getPage(i);
        const textContent = await page.getTextContent();
        content += textContent.items.map((item: any) => item.str).join(' ') + ' ';
      }
    } else if (file.type === 'text/csv') {
      const text = await file.text();
      const results = Papa.parse(text, { header: true });
      content = results.data.map((row: any) => Object.values(row).join(' ')).join(' ');
    } else {
      content = await file.text();
    }

    setText(content);
    processText(content);
  };

  const processText = useCallback((input: string) => {
    const words = extractWords(input, minLength, maxLength, useExactWords);
    const generatedDomains = generateDomainNames(words, tlds, minLength, maxLength, useExactWords, includeNoTLD);
    const stats = analyzeDomains(words);
    
    setDomains(generatedDomains);
    setDomainStats(stats);
  }, [tlds, minLength, maxLength, useExactWords, includeNoTLD]);

  const handleTextChange = (newText: string) => {
    setText(newText);
    processText(newText);
  };

  const handleAddTld = (tld: string) => {
    setTlds((prev) => [...prev, tld]);
    if (text) {
      processText(text);
    }
  };

  const handleRemoveTld = (tld: string) => {
    setTlds((prev) => prev.filter((t) => t !== tld));
    if (text) {
      processText(text);
    }
  };

  const handleMinLengthChange = (value: number) => {
    setMinLength(value);
    if (text) {
      processText(text);
    }
  };

  const handleMaxLengthChange = (value: number) => {
    setMaxLength(value);
    if (text) {
      processText(text);
    }
  };

  const handleUseExactWordsChange = (value: boolean) => {
    setUseExactWords(value);
    if (text) {
      processText(text);
    }
  };

  const handleIncludeNoTLDChange = (value: boolean) => {
    setIncludeNoTLD(value);
    if (text) {
      processText(text);
    }
  };

  const handleExport = (format: 'csv' | 'json' | 'txt') => {
    exportDomains(domains, format);
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Domain Name Generator</h1>
        
        <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">Domain Configuration</h2>
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-medium mb-3">TLD Selection</h3>
              <TldSelector
                tlds={tlds}
                onAddTld={handleAddTld}
                onRemoveTld={handleRemoveTld}
                includeNoTLD={includeNoTLD}
                onIncludeNoTLDChange={handleIncludeNoTLDChange}
              />
            </div>
            <div>
              <h3 className="text-lg font-medium mb-3">Domain Length</h3>
              <DomainLengthConfig
                minLength={minLength}
                maxLength={maxLength}
                onMinLengthChange={handleMinLengthChange}
                onMaxLengthChange={handleMaxLengthChange}
              />
            </div>
            <div>
              <h3 className="text-lg font-medium mb-3">Word Processing</h3>
              <WordProcessingConfig
                useExactWords={useExactWords}
                onUseExactWordsChange={handleUseExactWordsChange}
              />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">Upload File</h2>
          <FileUploader
            onFileSelect={handleFileSelect}
            accept={{
              'application/pdf': ['.pdf'],
              'text/plain': ['.txt'],
              'text/csv': ['.csv']
            }}
          />
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">Or Paste Text</h2>
          <TextInput
            value={text}
            onChange={handleTextChange}
          />
        </div>

        {domainStats && (
          <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
            <h2 className="text-xl font-semibold mb-4">Domain Analysis</h2>
            <DomainStatsDisplay stats={domainStats} />
          </div>
        )}

        {domains.length > 0 && (
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold">Generated Domains</h2>
              <ExportOptions domains={domains} onExport={handleExport} />
            </div>
            <DomainList
              domains={domains}
              availableDomains={availableDomains}
              checkedDomains={checkedDomains}
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default App;