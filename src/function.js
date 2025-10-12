function checkDivisible(n, divisor) {
  if (n % divisor) {
    return false;
  } else {
    return true;
  }
}

console.log(checkDivisible(10, 2));
console.log(checkDivisible(10, 3));

function countDifferences(str1, str2) {
  if (str1.length !== str2.length) {
    return -1;
  }

  let count = 0;

  for (let i = 0; i < str1.length; i++) {
    if (str1[i] !== str2[i]) {
      count++;
    }
  }

  return count;
}

console.log(countDifferences("test", "text")); // 1
console.log(countDifferences("abc", "xyz")); // 3
console.log(countDifferences("abc", "ab")); // -1
