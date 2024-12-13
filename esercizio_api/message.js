const figlet = require("figlet");
const message = (mess) => {
  figlet(mess, function (err, data) {
    if (err) {
      console.log("Something went wrong...");
      console.dir(err);
      return;
    }
    console.log(data);
  });
};
message("questo è il modulo js");
