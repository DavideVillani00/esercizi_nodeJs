import mysql from "mysql2";
require("dotenv").config();
const DB_PASS = process.env.DB_PASS;

// crea la connessione
export const conn = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: DB_PASS,
});

// connettiti al server
conn.connect((err) => {
  if (err) throw "errore nella connessione";
  console.log("connessione avvenuta con successo");
});

// crea il database
conn.query("CREATE DATABASE IF NOT EXISTS solar_system", (err) => {
  if (err) throw "errore nel database";
  console.log("database creato o già esistente");
});

// cambia la connessione per connetterti al database
conn.changeUser({ database: "solar_system" }, (err) => {
  if (err) throw "errore nella connessione al database";
  console.log("connessione con il database avenuta con successo");
});

// crea la tabella
conn.query(
  "CREATE TABLE IF NOT EXISTS planets (id INT AUTO_INCREMENT PRIMARY KEY, name VARCHAR(30) UNIQUE NOT NULL)",
  (err) => {
    if (err) throw "errore nella creazione della tabella";
    console.log("tabella creata o già esistente");
  }
);

// resetta la tabella (per non sovraccaricare il progetto)
conn.query("TRUNCATE TABLE planets", (err) => {
  if (err) throw "errore nel reset della tabella";
  console.log("tabella ripristinata di default");
});

// inserisci i primi 2 pianeti di default
let params = [["Mercury"], ["Venus"]];
conn.query("INSERT INTO planets (name) VALUES ?", [params], (err) => {
  if (err) throw "errore nell'inserimento dei pianeti di default";
  console.log("pianeti di default inseriti");
});
