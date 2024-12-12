const fs = require("fs");

let input = `questo è l'input sovrascritto`;

fs.writeFile("file.txt", input, (err) => {
  if (err) {
    console.error(err);
    return;
  }
});
