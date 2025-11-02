//import { pi as someValue, Sum, Product } from './math.js'
import * as Math from "./math.js";

console.log(Math.pi);
console.log(Math.Sum(1, 2));
console.log(Math.Product(2, 3));

import * as Geometry from "./geometrie.js";

console.log("Valoarea lui PI:", Geometry.PI);
console.log("Aria unui cerc cu raza 5 este:", Geometry.circleArea(5));
