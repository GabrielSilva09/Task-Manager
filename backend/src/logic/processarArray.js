// Processa os números do array
function processarArray(arr) {
  
  let somaPares = 0;
  let somaImpares = 0;
  let contagemImpares = 0;

  for (const item of arr) {
    // Verifica se o item é um número válido
    if (typeof item === 'number' && !isNaN(item)) {
      if (item % 2 === 0) {
        // Soma os números pares
        somaPares += item;
      } else {
        // Soma os números ímpares e salva sua contagem para calcular a média
        somaImpares += item;
        contagemImpares++;
      }
    }
  }
  // Calcula a média dos ímpares
  const mediaImpares = contagemImpares > 0 ? somaImpares / contagemImpares : 0;

  // Retorna os resultados
  return {
    somaPares: somaPares,
    mediaImpares: mediaImpares,
  };
}

// Chamada da função
const entrada = [1, 2, 3, 4, 5, 11, 10, "a", null, undefined, NaN, "6"];
const resultado = processarArray(entrada);
console.log("Calculando o array...");
console.log("Array de entrada: ", entrada);
console.log("Calculo completo!");
console.log(resultado);