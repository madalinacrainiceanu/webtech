String.prototype.capitalizedWords = function () {
  return this.replace(/\b[a-z]/g, (match) => match.toUpperCase());
};

console.log("these words will be calipalized".capitalizedWords());
Number.prototype.times = function (callback) {
  // 'this' este numărul pe care o chemăm (ex: 3)
  for (let i = 0; i < this; i++) {
    callback(i); // apelăm funcția de fiecare dată
  }
};

(3).times((i) => {
  console.log(`Execuție #${i + 1}`);
});

(5).times(() => {
  console.log("Salut din times()!");
});
