import express from "express";
import router from "./src/routers/index.router.js";
import errorHandler from "./src/middlewares/errorHandler.mid.js";
import pathHandler from "./src/middlewares/pathHandler.mid.js";
import __dirname from "./utils.js";
import morgan from "morgan";
import { engine } from "express-handlebars";
import { createServer } from "http";
import { Server } from "socket.io";
import productsManager from "./src/data/fs/product.fs.js";

const server = express();
const PORT = 8080;
const ready = () => console.log("Server ready on port: " + PORT);
const httpServer = createServer(server);
const socketServer = new Server(httpServer);
httpServer.listen(PORT, ready);
socketServer.on("connection", (socket) => {
  socket.emit("welcome", "welcome to my ecommerce");
  socket.emit("products", productsManager.read());
  socket.on("new product", async (data) => {
    try {
      console.log(data);
      await productsManager.create(data);
      socketServer.emit("products", productsManager.read());
    } catch (error) {
      console.log(error);
    }
  });
});

server.engine("handlebars", engine());
server.set("view engine", "handlebars");
server.set("views", __dirname + "/src/views");

server.use(express.json());
server.use(express.urlencoded({ extended: true }));
server.use(express.static(__dirname + "/public"));
server.use(morgan("dev"));
server.use("/", router);
server.use(errorHandler);
server.use(pathHandler);
