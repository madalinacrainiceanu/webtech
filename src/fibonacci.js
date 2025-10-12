// Funcția care calculează elementul n din șirul Fibonacci
const fibonacci = (n) => {
  if (n < 0) {
    return -1; // caz invalid
  }
  if (n === 0) {
    return 0;
  }
  if (n === 1) {
    return 1;
  }

  let a = 0,
    b = 1,
    c;
  for (let i = 2; i <= n; i++) {
    c = a + b;
    a = b;
    b = c;
  }

  return b;
};

// Verif dacă s-a transmis un parametru
if (process.argv.length <= 2) {
  console.log("not enough parameters");
} else {
  const n = parseInt(process.argv[2]);
  console.log(fibonacci(n));
}
