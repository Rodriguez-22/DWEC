import { analyzeText } from "../analyzer.js";

describe("Text Analyzer", () => {
  test("Debe manejar texto vacío", () => {
    const result = analyzeText("");
    expect(result.wordCount).toBe(0);
    expect(result.characterCount).toBe(0);
  });

  test("Debe contar correctamente palabras y oraciones", () => {
    const result = analyzeText("Hola mundo. Esto es una prueba!");
    expect(result.wordCount).toBe(6);
    expect(result.sentenceCount).toBe(2);
  });

  test("Debe calcular la frecuencia de palabras y top 5", () => {
    const result = analyzeText("JS JS JS HTML HTML CSS");
    expect(result.topKeywords[0]).toBe("js");
    expect(result.wordFrequency.get("js")).toBe(3);
  });

  test("Debe ignorar stopwords comunes", () => {
    const result = analyzeText("El la los las de del y un una prueba");
    expect(result.wordCount).toBeGreaterThan(0);
    expect(result.uniqueWords).toBe(1);
  });
});
