require("dotenv").config();
const express = require("express");
const app = express();

// Middleware global – afișează metoda și URL-ul la fiecare cerere
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

// Rute
const departmentsRouter = require('./routes/departments');
const statusRouter = require('./routes/status');


// Middleware NOU pentru afișarea stack-ului erorii (Pasul 7)
app.use((err, req, res, next) => {
  console.error("STACK TRACE:");
  console.error(err.stack);
  next(err); // trimite mai departe către handlerul final
});

// Handler-ul final de erori (cel din video)
app.use((err, req, res, next) => {
  res.status(500).json({
    error: err.message || "A apărut o eroare pe server."
  });
});

// Pornirea serverului
const PORT = process.env.PORT || 7000;
app.listen(PORT, () => {
  console.log(`Server started on http://localhost:${PORT}`);
});
