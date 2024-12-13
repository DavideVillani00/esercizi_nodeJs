import express from "express";
import morgan from "morgan";
import {
  changeOneById,
  getAll,
  getOneById,
  createOne,
  deleteOneById,
} from "./controllers/controls.js";

const app = express();
app.use(morgan("dev"));
app.use(express.json());

const port = 3000;

// prendi tutti i pianeti
app.get("/planets", getAll);

// prendi un pianeta con id
app.get("/planets/:id", getOneById);

// crea un nuovo pianeta
app.post("/planets", createOne);

// modifica un pianeta
app.put("/planets", changeOneById);

// elimina un pianeta
app.delete("/planets/:id", deleteOneById);

app.listen(port, () => {
  console.log(`applicazione avviata su http://localhost:${port}`);
});
