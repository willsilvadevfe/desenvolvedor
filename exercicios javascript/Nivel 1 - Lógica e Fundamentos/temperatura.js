let celsius = 42;
let fahrenheit = 88;

//Celsius para Fahrenheit
let converterCelParaFah = celsius * 1.8 + 32;

//Fahrenheit para Celsius
let converterFahParaCel = (fahrenheit - 32) * 5;
let resultadoFahParaCel = converterFahParaCel / 9;

console.log(
  `${celsius}°C convertido para Fahrenheit é ${converterCelParaFah}°F`,
);

console.log(
  `${fahrenheit}°F convertido para Celsius é ${resultadoFahParaCel}°C`,
);
