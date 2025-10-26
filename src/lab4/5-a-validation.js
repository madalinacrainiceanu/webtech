const orderCoffee = (type) => {
  const types = {
    REGULAR: "REGULAR",
    SPECIAL: "SPECIAL",
  };

  if (Object.values(types).indexOf(type) === -1) {
    throw new Error("coffee error");
  } else {
    console.log(`preparing ${type} coffee`);
  }
};

try {
  orderCoffee("REGULAR");
  orderCoffee("SWEET_COFFEE_NO_SUGAR");
} catch (err) {
  console.log(err);
}

function increaseSalary(salaries, percent) {
  // Verificăm tipurile parametrilor
  if (!Array.isArray(salaries)) {
    throw new Error("Primul parametru trebuie să fie un array de salarii!");
  }

  if (typeof percent !== "number") {
    throw new Error("Al doilea parametru trebuie să fie un număr (procentul)!");
  }

  // Calculăm salariile mărite
  return salaries.map((salary) => {
    if (typeof salary !== "number") {
      throw new Error(`Valoare invalidă în lista de salarii: ${salary}`);
    }
    return salary + (salary * percent) / 100;
  });
}

try {
  const salariiNoi = increaseSalary([2000, 2500, 3000], 10);
  console.log("Salarii mărite:", salariiNoi);
} catch (err) {
  console.log("Eroare:", err.message);
}

// Test cu input greșit
try {
  increaseSalary("nu e array", 10);
} catch (err) {
  console.log("Eroare:", err.message);
}

try {
  increaseSalary([2000, 2500, 3000], "zece");
} catch (err) {
  console.log("Eroare:", err.message);
}
