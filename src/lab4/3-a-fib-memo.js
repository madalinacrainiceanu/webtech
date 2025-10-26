function fibGen() {
  const cache = [1, 1];
  const fib = (index) => {
    if (index < cache.length) {
      console.log("found " + index);
      return cache[index];
    } else {
      console.log("calculated " + index);
      cache[index] = fib(index - 1) + fib(index - 2);
      return cache[index];
    }
  };
  return fib;
}

const fib = fibGen();
console.log(fib(1));
console.log(fib(5));
console.log(fib(3));

function powGen() {
  const cache = {}; // pentru memoizare (cheie: "a,b")

  const pow = (a, b) => {
    const key = `${a},${b}`; // facem o cheie unică pentru fiecare combinație

    if (cache[key] !== undefined) {
      console.log(`found ${key} = ${cache[key]}`);
      return cache[key];
    }

    console.log(`calculated ${key}`);

    let result;
    if (b === 0) {
      result = 1;
    } else {
      result = a * pow(a, b - 1); // recursie
    }

    cache[key] = result; // salvăm rezultatul (inclusiv intermediare)
    return result;
  };

  return pow;
}

const pow = powGen();

console.log("Rezultat final:", pow(2, 5)); // 2^5 = 32
console.log("Rezultat refolosit:", pow(2, 5)); // se ia din cache
console.log("Alt calcul:", pow(3, 3)); // 3^3 = 27
console.log("Alt calcul refolosit:", pow(3, 3));
