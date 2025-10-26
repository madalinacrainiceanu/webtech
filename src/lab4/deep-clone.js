function deepClone(value) {
  // dacă valoarea nu este obiect sau este null, se returnează direct
  if (typeof value !== "object" || value === null) {
    return value;
  }

  // dacă este array, clonăm fiecare element
  if (Array.isArray(value)) {
    return value.map((item) => deepClone(item));
  }

  // dacă este obiect, clonăm fiecare proprietate
  const clonedObj = {};
  for (const key in value) {
    if (value.hasOwnProperty(key)) {
      clonedObj[key] = deepClone(value[key]);
    }
  }
  return clonedObj;
}

// test
const original = {
  name: "andrei",
  age: 22,
  address: {
    city: "iasi",
    coords: { lat: 47.16, lon: 27.58 },
  },
  skills: ["js", "html", "css"],
};

const copy = deepClone(original);

// modificăm copia ca să verificăm dacă originalul rămâne neschimbat
copy.address.city = "cluj";
copy.skills.push("react");

console.log("original:", original);
console.log("copy:", copy);
