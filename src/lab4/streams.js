class Stream {
  #value;
  #nextvalue;

  static #count = 0;
  constructor(value, nextValue) {
    this.#value = value;
    this.#nextvalue = nextValue;
    Stream.#count++;
  }

  get value() {
    return this.#value;
  }

  get next() {
    this.#value = this.#nextvalue(this.#value);
    return this.#value;
  }

  static get count() {
    return Stream.#count;
  }
}

class ConstantStream extends Stream {
  constructor(value) {
    super(value, (value) => value);
  }
}

class NextIntegerStream extends Stream {
  constructor() {
    super(0, (value) => value + 1);
  }
}

const constant = new ConstantStream(1);
const nextInteger = new NextIntegerStream();

for (let i = 0; i < 10; i++) {
  console.log(`constant[${i}] = ${constant.next}`);
  console.log(`nextInteger[${i}] = ${nextInteger.next}`);
}

console.log(Stream.count);

//cerinta1
class EvenStream extends Stream {
  constructor(startValue) {
    // dacă valoarea inițială e impară, o transform în pară
    const firstEven = startValue % 2 === 0 ? startValue : startValue + 1;
    // transmit la clasa părinte funcția care adaugă 2 la fiecare pas
    super(firstEven, (value) => value + 2);
  }
}

console.log("Șir de numere pare:");
const even = new EvenStream(3); // începe de la 4, fiind primul număr par >= 3

for (let i = 0; i < 10; i++) {
  console.log(`even[${i}] = ${even.next}`);
}

console.log(`Număr total de stream-uri create: ${Stream.count}`);
