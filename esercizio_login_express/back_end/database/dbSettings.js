// !! siccome lavoro in locale su più pc questo file serve per poter creare lo stesso database e la stessa tabella in maniera uguale su tutti i pc, da avviare la prima volta
const bcrypt = require("bcrypt");
const conn = require("./dbConnection.js");

// ? il database sarà da creare manualmente sulla workbench per non intasare il codice nomedb = "exercise_login_express"

// se non esistente crea la tabella
conn.query(
  "CREATE TABLE IF NOT EXISTS subscribed_users (id INT PRIMARY KEY AUTO_INCREMENT, user_name VARCHAR(50) NOT NULL UNIQUE, user_pass VARCHAR(255) NOT NULL, user_role VARCHAR(10) DEFAULT 'user' )",
  (err) => {
    if (err) throw err;
    console.log("tabella creata con successo oppure tabella già esistente");
  }
);

// se non è gia presente inserisci admin con id 1
conn.query("SELECT * FROM subscribed_users", async (err, result) => {
  if (err) throw err;
  if (!result.length > 0) {
    const passHash = await bcrypt.hash("admin", 10);
    conn.query(
      "INSERT INTO subscribed_users (user_name, user_pass, user_role) VALUES (?, ?, ?)",
      ["admin", passHash, "admin"],
      (err) => {
        if (err) throw err;
        console.log("admin aggiunto con successo");
      }
    );
  } else {
    console.log(result); //controlla che sia corretto
  }
});
