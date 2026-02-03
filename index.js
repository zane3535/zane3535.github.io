import "dotenv/config";
import http from "node:http";
import express from "express";
import chalk from "chalk";
import { server as wisp } from "@mercuryworkshop/wisp-js/server";

const app = express();


app.get("/check", (req, res) => res.status(200).send("OK"));


const server = http.createServer();

server.on("request", (req, res) => {
  app(req, res);
});

server.on("upgrade", (req, socket, head) => {
  if (req.url.startsWith("/wisp/")) {
    wisp.routeRequest(req, socket, head);
  } else {
    socket.destroy();
  }
});

const PORT = process.env.PORT || 8080;
server.listen(PORT, () => {
  console.log(chalk.green(`🚀 UBX WISP SERVER LIVE | Port ${PORT}`));
});