import { createServer } from "node:http";

const PORT = parseInt(process.env.PORT || "3000", 10);
const ENV = process.env.NODE_ENV || "development";

const server = createServer((req, res) => {
  if (req.url === "/health") {
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ status: "ok", env: ENV }));
    return;
  }

  res.writeHead(200, { "Content-Type": "text/html" });
  res.end(`<!doctype html>
<html lang="nl">
<head><meta charset="utf-8"><title>HumanaIze Platform</title></head>
<body>
  <h1>HumanaIze Platform</h1>
  <p>Engineering foundation — ${ENV}</p>
</body>
</html>`);
});

server.listen(PORT, () => {
  console.log(`Platform running on :${PORT} [${ENV}]`);
});
