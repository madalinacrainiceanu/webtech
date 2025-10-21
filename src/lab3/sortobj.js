const getFilteredObjects = (array, object) => {
  return array.filter((element) => {
    let result = false;
    Object.keys(object).forEach((key) => {
      if (!element[key] || element[key] !== object[key]) {
        result = true;
      }
    });
    return result;
  });
};

const laptops = [
  {
    brand: "HP",
    processor: "i5",
    ram: 8,
  },
  {
    brand: "Lenovo",
    processor: "i5",
    ram: 16,
  },
  {
    brand: "Acer",
    processor: "i5",
    ram: 8,
  },
  {
    brand: "Asus",
    processor: "i7",
    ram: 8,
  },
];

const result = getFilteredObjects(laptops, { processor: "i5", ram: 8 });
console.log("result ", result);
const sortObjectsByKey = (array, key) => {
  return array.slice().sort((a, b) => {
    if (a[key] < b[key]) return -1;
    if (a[key] > b[key]) return 1;
    return 0;
  });
};

const lap = [
  { brand: "HP", processor: "i5", ram: 8 },
  { brand: "Lenovo", processor: "i5", ram: 16 },
  { brand: "Acer", processor: "i5", ram: 8 }, // ← aici era greșeala
  { brand: "Asus", processor: "i7", ram: 8 },
];

const res = sortObjectsByKey(lap, "brand");
console.log(res);
