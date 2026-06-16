import { describe, it } from "node:test";
import assert from "node:assert/strict";

describe("health check", () => {
  it("returns ok status", async () => {
    const { createServer } = await import("node:http");

    const server = createServer((req, res) => {
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ status: "ok", env: "test" }));
    });

    await new Promise((resolve) => server.listen(0, resolve));
    const { port } = server.address();

    const res = await fetch(`http://localhost:${port}/health`);
    const body = await res.json();

    assert.equal(body.status, "ok");
    assert.equal(body.env, "test");

    server.close();
  });
});
