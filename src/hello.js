let sayHello = (name) => {
  return "Hello,${name}!";
};
console.log(sayHello(process.argv[2]));

let concatStrings = (arr) => {
  return arr.join("");
};
console.log(concatStrings(["JavaScript", " ", "este", " ", "interesant", "!"]));
