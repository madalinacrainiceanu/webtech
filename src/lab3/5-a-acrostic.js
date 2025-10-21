const sampleDictionary = [
  "the",
  "quick",
  "brown",
  "fox",
  "jumps",
  "over",
  "lazy",
  "dog",
];

const sampleText = `
    best
    read
    on
    windy
    nights
`;
const checkAcrostic = (text, dictionary) => {
  const candidate = text
    .split("\n")
    .filter((e) => e)
    .map((e) => e.trim())
    .map((e) => e[0])
    .join("");

  return dictionary.indexOf(candidate) !== -1;
};

console.log(checkAcrostic(sampleText, sampleDictionary));

const censorText = (text, dictionary) => {
  return text
    .split(" ") // spargem în cuvinte
    .map((word) => {
      // dacă cuvântul este în dicționar, îl cenzurăm
      if (dictionary.includes(word)) {
        // păstrăm prima și ultima literă, restul stele
        const first = word[0];
        const last = word[word.length - 1];
        const middle = "*".repeat(word.length - 2);
        return first + middle + last;
      }
      // dacă nu, îl lăsăm cum e
      return word;
    })
    .join(" "); // reconstruim șirul
};

const text = "javascript este minunat";
const dict = ["este"];

console.log(censorText(text, dict));
// -> "javascript e**e minunat"
