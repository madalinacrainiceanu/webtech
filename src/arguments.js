function addToArray(array, ...args) {
  for (var i = 0; i < args.length; i++) {
    array.push(args[i]);
  }

  return array;
}

let array = ["a"];
console.log(addToArray(array, "b", "c").join(", "));

function intercalateArrays(array1, array2) {
  if (array1.length !== array2.length) {
    return []; // sau poți returna -1, dacă vrei să semnalezi eroarea
  }

  let result = [];

  for (let i = 0; i < array1.length; i++) {
    result.push(array1[i]);
    result.push(array2[i]);
  }

  return result;
}

console.log(intercalateArrays([1, 2, 3], ["a", "b", "c"]));
//  [1, 'a', 2, 'b', 3, 'c']

console.log(intercalateArrays(["x", "y"], [10, 20]));
//  ["x", 10, "y", 20]
