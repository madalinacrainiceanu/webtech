const getTotalArea = (squareDimensions) => {
  return squareDimensions
    .map((side) => {
      return side * side;
    })
    .reduce((prev, current) => {
      return prev + current;
    }, 0);
};

const squareDimensions = [3, 5, 12, 3, 5, 3];

const result = getTotalArea(squareDimensions);
console.log("result: ", result);

const sumDivisibleNumbers = (numbers, divisor) => {
  return numbers
    .filter((num) => num % divisor === 0) // păstrează doar numerele divizibile
    .reduce((total, current) => total + current, 0); // le adună
};

const numbers = [10, 15, 21, 30, 7, 42];
const divisor = 3;

const res = sumDivisibleNumbers(numbers, divisor);
console.log("Suma numerelor divizibile cu", divisor, "este:", res);
