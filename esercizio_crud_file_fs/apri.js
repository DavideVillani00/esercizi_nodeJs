const fs = require("fs");

fs.open("file.txt", (err, file) => {
  if (err) {
    console.error(err);
    return;
  }
  console.log(file);
});
