import express from "express";
import router from "./src/routers/index.router.js";
import usersManager from "./src/data/fs/user.fs.js";
import productsManager from "./src/data/fs/product.fs.js";
import errorHandler from "./src/middlewares/errorHandler.mid.js";
import pathHandler from "./src/middlewares/pathHandler.mid.js";
import __dirname from "./utils.js";
import morgan from "morgan";
import { engine } from "express-handlebars";

const server = express();
const PORT = 8080;
const ready = () => console.log("Server ready on port: " + PORT);
server.listen(PORT, ready);
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

