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

// GET - returnează lista completă
router.route("/getList").get((req, res) => {
  res.json(array);
});

// POST - adaugă un nou element în listă
router.route("/postList").post((req, res) => {
  const el = req.body;
  el.id = array.length + 1;
  array.push(el);
  res.json(el);
});

// noul endpoint
router.route("/getById/:id").get((req, res) => {
  const id = parseInt(req.params.id);
  const item = array.find((x) => x.id === id);

  if (item) {
    res.json(item);
  } else {
    res.status(404).json({ message: "Resursa nu a fost găsită." });
  }
});

const port = 8000;
app.listen(port, () => console.log(`API is running on port ${port}`));
