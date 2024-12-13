import { conn } from "./db_connection.js";

// prendi tutti i pianeti
export const getAll = (req, res) => {
  conn.query("SELECT * FROM planets", (err, result) => {
    if (err)
      throw res.status(500).json({ msg: "errore nel caricamento dei pianeti" });
    res.status(200).json(result);
  });
};

// prendi un pianeta con id
export const getOneById = (req, res) => {
  const { id } = req.params;
  conn.query("SELECT * FROM planets WHERE id= ?", [id], (err, result) => {
    if (err)
      throw res.status(500).json({ msg: "errore nel caricamento del pianeta" });
    // in caso si inserisca un id che non esiste
    if (!result.length > 0)
      throw res.status(404).json({ msg: "pianeta non trovato" });
    res.status(200).json(result);
  });
};

// crea un nuovo pianeta
export const createOne = (req, res) => {
  const { name } = req.body;
  if (!name) throw res.status(400).json({ msg: "inserisci un nome valido" });
  conn.query("INSERT INTO planets (name) VALUES (?)", [name], (err) => {
    if (err)
      throw res
        .status(500)
        .json({ msg: "errore nell'inserimento del pianeta" });
    res.status(201).json({ msg: "pianeta creato" });
  });
};

// modifica un pianeta
export const changeOneById = (req, res) => {
  const { id, name } = req.body;
  if (!id)
    throw res.status(404).json({ msg: "pianeta da modificare non trovato" });
  if (!name) throw res.status(400).json({ msg: "inserisci un nome valido" });
  conn.query(
    "UPDATE planets SET name= (?) WHERE id= (?)",
    [[name], [id]],
    (err, result) => {
      if (err)
        throw res
          .status(400)
          .json({ msg: "errore nella modifica del pianeta" });
      if (!result.length > 0)
        throw res
          .status(404)
          .json({ msg: "pianeta da modificare non trovato" });
      res.status(200).json({ msg: "pianeta modificato con successo" });
    }
  );
};

// elimina un pianeta
export const deleteOneById = (req, res) => {
  const { id } = req.params;
  if (!id) throw res.status(404).json({ msg: "pianeta non trovato" });
  conn.query("DELETE FROM planets WHERE id= (?)", [id], (err) => {
    if (err)
      throw res
        .status(500)
        .json({ msg: "errore nell'eliminazione del pianeta" });
    res.status(200).json({ msg: "pianeta eliminato con successo" });
  });
};
