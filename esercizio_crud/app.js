const express = require("express");
const morgan = require("morgan");
require("express-async-errors");
const {
  getAll,
  getOneById,
  createOne,
  editOneById,
  deleteOneById,
} = require("./controllers/controller");
// creazione applicazione con express e variabile porta
const app = express();
const port = 3000;

// utilizzo di middlwere
app.use(express.json());
app.use(morgan("dev"));

// prendi tutti gli elementi
app.get("/planets", getAll);

// prendi l'elemento con un certo id
app.get("/planets/:id", getOneById);

// crea un nuovo pianeta
app.post("/planets", createOne);

// modifica il pianeta con un certo id
app.put("/planets/:id", editOneById);

// elimina il pianeta con un certo id
app.delete("/planets/:id", deleteOneById);

app.listen(port, () => {
  console.log(`esercizio iniziato su http://localhost:${port}`);
});
