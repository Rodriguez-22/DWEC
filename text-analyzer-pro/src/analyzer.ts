import { stopWords } from "./stopwords.js";

/**
 * Interfaz de estadísticas de texto
 */
export interface TextStatistics {
  characterCount: number;
  characterCountNoSpaces: number;
  wordCount: number;
  sentenceCount: number;
  paragraphCount: number;
  averageWordLength: number;
  averageSentenceLength: number;
  wordFrequency: Map<string, number>;
  topKeywords: string[];
  uniqueWords: number;
}

/**
 * Analiza un texto y devuelve un objeto con estadísticas detalladas.
 * @param text Texto a analizar
 * @returns Objeto con métricas de texto
 */
export function analyzeText(text: string): TextStatistics {
  const cleanedText = text.trim();

  const words = cleanedText
    .toLowerCase()
    .match(/\b[\p{L}\p{N}']+\b/gu) || [];

  const sentences = cleanedText.match(/[.!?]+/g) || [];
  const paragraphs = cleanedText.split(/\n\s*\n/).filter(Boolean);

  const characterCount = cleanedText.length;
  const characterCountNoSpaces = cleanedText.replace(/\s/g, "").length;
  const wordCount = words.length;
  const sentenceCount = sentences.length || 0;
  const paragraphCount = paragraphs.length || 0;

  const averageWordLength = wordCount ? characterCountNoSpaces / wordCount : 0;
  const averageSentenceLength = sentenceCount ? wordCount / sentenceCount : 0;

  // Calcular frecuencia de palabras
  const wordFrequency = new Map<string, number>();
  for (const word of words) {
    if (!stopWords.includes(word)) {
      wordFrequency.set(word, (wordFrequency.get(word) || 0) + 1);
    }
  }

  // Top 5 palabras clave
  const sorted = [...wordFrequency.entries()].sort((a, b) => b[1] - a[1]);
  const topKeywords = sorted.slice(0, 5).map(([w]) => w);
  const uniqueWords = wordFrequency.size;

  return {
    characterCount,
    characterCountNoSpaces,
    wordCount,
    sentenceCount,
    paragraphCount,
    averageWordLength,
    averageSentenceLength,
    wordFrequency,
    topKeywords,
    uniqueWords
  };
}
