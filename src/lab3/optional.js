const numbers = [10, 20, 30, 40, 50];

// Funcție pentru a calcula media folosind reduce
function calculateAverage(arr) {
  if (arr.length === 0) return 0; // verificăm să nu împărțim la zero

  const sum = arr.reduce(
    (accumulator, currentValue) => accumulator + currentValue,
    0
  );
  return sum / arr.length;
}

// Apelarea funcției
const average = calculateAverage(numbers);
console.log("Media numerelor este:", average);
