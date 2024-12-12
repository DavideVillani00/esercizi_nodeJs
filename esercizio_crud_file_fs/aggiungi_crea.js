import * as fs from "node:fs";
let input = "\nquesta è la seconda riga";
fs.appendFile("file.txt", input, (err) => {
  if (err) {
    console.error(err);
  }
});
