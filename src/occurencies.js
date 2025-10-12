// function occurencies(text, character) {
//   let count = 0;
//   for (var i = 0; i < text.length; i++) {
//     if (text.charAt(i) === character) {
//       count++;
//     }
//   }
//   return count;
// }

// console.log(occurencies("sample text", "e"));
function occurencies(text, character) {
  return text.split(character).length - 1;
}

console.log(occurencies("sample text", "e"));

function copyNumbers(numbers) {
  let result = [];

  for (let i = 0; i < numbers.length; i++) {
    result.push(numbers[i]);
  }

  return result;
}

console.log(copyNumbers([1, 2, 3, 4, 5]));
console.log(copyNumbers([10, 20, 30]));
