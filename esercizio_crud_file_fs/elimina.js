import fs from "fs";

fs.unlink("file.txt", (err) => {
  if (err) {
    console.error(err);
  }
});
