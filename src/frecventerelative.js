// const sampleString = "the quick brown fox jumps over the lazy dog";

// const getCounts = (text) => {
//   const words = text.split(" ");
//   const result = {};
//   for (let word of words) {
//     if (word in result) {
//       result[word]++;
//     } else {
//       result[word] = 1;
//     }
//   }
//   for (let word in result) {
//     result[word] /= words.length;
//   }
//   return result;
// };

// console.log(getCounts(sampleString));

const getLetterFrequencies = (text) => {
  const letters = text.split("").filter((ch) => ch !== " "); // eliminăm spațiile
  const result = {};

  // Contorizăm aparițiile fiecărei litere
  for (let letter of letters) {
    if (letter in result) {
      result[letter]++;
    } else {
      result[letter] = 1;
    }
  }

  // Calculăm frecvențele relative
  for (let letter in result) {
    result[letter] /= letters.length;
  }

  return result;
};

const sampleText = "hello world";
console.log(getLetterFrequencies(sampleText));
