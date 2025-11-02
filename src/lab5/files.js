import fs from "fs";
import { rimraf } from "rimraf";

const dirName = "testDir";
const fileName = `${dirName}/fisier.txt`;

// 1. Creare director
if (!fs.existsSync(dirName)) {
  fs.mkdirSync(dirName);
  console.log("Director creat:", dirName);
}

// 2. Creare fișier în director
fs.writeFileSync(fileName, "Salut! Acesta este un fișier test.");
console.log("Fișier creat:", fileName);

// 3. Citire fișier
const content = fs.readFileSync(fileName, "utf8");
console.log("Conținutul fișierului:", content);

// 4. Ștergere director
rimraf(dirName)
  .then(() => console.log("Directorul a fost șters cu succes."))
  .catch((err) => console.error("Eroare la ștergere:", err));
