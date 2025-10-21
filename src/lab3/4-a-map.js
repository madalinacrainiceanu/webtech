const sampleArray = [1, 2, 3, 4, 5];

const map = (array, transformation) => {
  const result = [];
  for (const element of array) {
    result.push(transformation(element));
  }
  return result;
};
console.log(map(sampleArray, (x) => x * 2));

const reduce = (array, reducer, initialValue) => {
  let accumulator = initialValue;

  for (const element of array) {
    accumulator = reducer(accumulator, element);
  }

  return accumulator;
};

const sampleArr = [1, 2, 3, 4, 5];

const result = reduce(sampleArr, (acc, current) => acc + current, 0);

console.log(result); // 15
