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

class EvenNumberStream extends Stream {
  constructor(startValue) {
    // dacă valoarea inițială e impară, o facem pară adăugând 1
    const firstEven = startValue % 2 === 0 ? startValue : startValue + 1;
    super(firstEven, (value) => value + 2);
  }
}

// Test
const constant = new ConstantStream(1);
const nextInteger = new NextIntegerStream();
const evenStream1 = new EvenNumberStream(2); // pornește de la par
const evenStream2 = new EvenNumberStream(3); // pornește de la impar, dar se corectează automat

for (let i = 0; i < 5; i++) {
  console.log(`evenStream1[${i}] = ${evenStream1.next}`);
}

for (let i = 0; i < 5; i++) {
  console.log(`evenStream2[${i}] = ${evenStream2.next}`);
}

console.log("Număr total de streamuri create:", Stream.count);
