import { createServer } from "node:http";
const server = createServer((req, res) => {
  console.log("richiesta avviata");

  res.statusCode = 200;

  res.setHeader("Content-Type", "application/json");

  const jsonString = JSON.stringify({ location: "Mars" });

  res.end(jsonString);
});

server.listen(3000, () => {
  console.log("server avviato in: https://localhost:3000/");
});
