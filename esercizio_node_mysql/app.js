import express from "express";
import morgan from "morgan";
import { conn } from "./controllers/db_connection.js";

const app = express();
app.use(morgan("dev"));

const port = 3000;

// prendi tutti i pianeti
app.get("/planets", (req, res) => {
  conn.query("SELECT * FROM planets", (err, result) => {
    if (err)
      throw res.status(500).json({ msg: "errore nel caricamento dei pianeti" });
    res.status(200).json(result);
  });
});

// prendi un pianeta con id
app.get("/planets/:id", (req, res) => {
  const { id } = req.params;
  conn.query("SELECT * FROM planets WHERE id= ?", [id], (err, result) => {
    if (err)
      throw res.status(500).json({ msg: "errore nel caricamento del pianeta" });
    // in caso si inserisca un id che non esiste
    if (!result.length > 0)
      throw res.status(404).json({ msg: "pianeta non trovato" });
    res.status(200).json(result);
  });
});

// app.post("planets", (req, res) => {
//   const { name } = req.body();
// });

app.listen(port, () => {
  console.log(`applicazione avviata su http://localhost:${port}`);
});
