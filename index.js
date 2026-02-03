import "dotenv/config";
import http from "node:http";
import express from "express";
import chalk from "chalk";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { server as wisp } from "@mercuryworkshop/wisp-js/server";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();


app.get("/check", (req, res) => res.status(200).send("OK"));


app.use(express.static(path.join(__dirname, "/"), {
    extensions: ["html", "htm"],
    index: "index.html"
}));


const server = http.createServer();
server.on("request", (req, res) => { app(req, res); });

server.on("upgrade", (req, socket, head) => {
  if (req.url.startsWith("/wisp/")) {
    wisp.routeRequest(req, socket, head);
  } else {
    socket.destroy();
  }
});

const PORT = 8080;
server.listen(PORT, () => {
  console.log(chalk.green(`🚀 UBX WISP SERVER LIVE | Port ${PORT}`));
});
