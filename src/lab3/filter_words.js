const words = [
  "fox",
  "wolf",
  "snake",
  "crocodile",
  "lion",
  "cat",
  "crocodile",
  "horse",
];

const forbiddenWord = "crocodile";
const minLength = 4;

const filterWords = (words, forbiddenWord, minLength) => {
  const result = words.filter((word) => {
    if (word !== forbiddenWord && word.length >= minLength) {
      return true;
    }
    return false;
  });
  return result;
};

console.log(filterWords(words, forbiddenWord, minLength));

// const words = [
//   "fox",
//   "wolf",
//   "snake",
//   "crocodile",
//   "lion",
//   "cat",
//   "crocodile",
//   "horse"
// ]

// const forbiddenWord = "crocodile"
// const minLength = 4

// const filterWords = (words, forbiddenWordminLength) => words.filter((word) =>
//   word !== forbiddenWord && word.length >= minLength)


// console.log(filterWords(words, forbiddenWord, minLength))


const birthYears = [2008, 1995, 2010, 1987, 2003, 1975];
const currentYear = new Date().getFullYear();

const getAdultAges = (years) => {
  return years.map((year) => currentYear - year).filter((age) => age >= 18);
};

console.log(getAdultAges(birthYears));
