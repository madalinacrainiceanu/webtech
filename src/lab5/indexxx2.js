import express from "express";
import bodyParser from "body-parser";
import cors from "cors";

const app = express();
const router = express.Router();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
app.use("/api", router);

const array = [
  { id: 1, name: "Ionuț", age: 25 },
  { id: 2, name: "Alex", age: 18 },
  { id: 3, name: "Mihai", age: 13 },
  { id: 4, name: "Marcel", age: 12 },
  { id: 5, name: "Marius", age: 22 },
];

// GET - toate persoanele
router.route("/getList").get((req, res) => {
  res.json(array);
});

// GET - o persoană după id
router.route("/getList/:id").get((req, res) => {
  const id = parseInt(req.params.id);
  const person = array.find((p) => p.id === id);
  if (person) res.json(person);
  else res.status(404).json({ message: "Persoană negăsită" });
});

// POST - adaugă o persoană nouă
router.route("/postList").post((req, res) => {
  const el = req.body;
  el.id = array.length + 1;
  array.push(el);
  res.json(el);
});

// PUT - actualizează o persoană după id
router.route("/update/:id").put((req, res) => {
  const id = parseInt(req.params.id);
  const index = array.findIndex((p) => p.id === id);
  if (index !== -1) {
    array[index] = { ...array[index], ...req.body };
    res.json(array[index]);
  } else {
    res.status(404).json({ message: "Persoană negăsită" });
  }
});

// DELETE - șterge o persoană după id
router.route("/delete/:id").delete((req, res) => {
  const id = parseInt(req.params.id);
  const index = array.findIndex((p) => p.id === id);
  if (index !== -1) {
    const deleted = array.splice(index, 1);
    res.json(deleted[0]);
  } else {
    res.status(404).json({ message: "Persoană negăsită" });
  }
});

const port = 8000;
app.listen(port);
console.log("API is running on port " + port);
