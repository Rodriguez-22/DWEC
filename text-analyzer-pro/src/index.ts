import { analyzeText } from "./analyzer.js";

const example = `
El desarrollo web moderno combina tecnologías como HTML, CSS y JavaScript.
Los desarrolladores buscan mejorar la accesibilidad y la experiencia del usuario.
`;

const stats = analyzeText(example);
console.log("📊 Resultados del análisis:\n");
console.log(stats);
