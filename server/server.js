import express from "express";
import router from "./src/routers/index.router.js";
import usersManager from "./src/data/fs/user.fs.js";
import productsManager from "./src/data/fs/product.fs.js";
import errorHandler from "./src/middlewares/errorHandler.mid.js";
import pathHandler from "./src/middlewares/pathHandler.mid.js";
import __dirname from "./utils.js";
import morgan from "morgan";
import { engine } from "express-handlebars";
import { createServer } from "http";
import { Server } from "socket.io";
import "dotenv/config.js";
import dbConnection from "./src/utils/db.js";
import cookieParser from "cookie-parser";
import expressSession from "express-session";
import sessionFileStore from "session-file-store";
import MongoStore from "connect-mongo";

const server = express();
const PORT = 8080;
const ready = () => {
  console.log("Servidor listo en el puerto: " + PORT);
  dbConnection();
};
const httpServer = createServer(server);
const socketServer = new Server(httpServer);

// Configuración de middlewares y rutas
const FileStore = sessionFileStore(expressSession);
server.use(cookieParser(process.env.SECRET_KEY));
/*server.use(
  expressSession({
    secret: process.env.SECRET_KEY,
    resave: true,
    saveUninitialized: true,
    store: new FileStore({
      path: "./src/data/fs/files/sessions",
      ttl: 10,
      retries: 2,
    }),
  })
);*/

server.use(
  expressSession({
    secret: process.env.SECRET_KEY,
    resave: true,
    saveUninitialized: true,
    store: new MongoStore({
      ttl: 7 * 24 * 60 * 60,
      mongoUrl: process.env.DB_LINK,
    }),
  })
);
server.use(express.json());
server.use(express.urlencoded({ extended: true }));
server.use(express.static(__dirname + "/public"));
server.use(morgan("dev"));
server.use("/", router);
server.use(errorHandler);
server.use(pathHandler);

// Configuración de Socket.IO
socketServer.on("connection", (socket) => {
  socket.emit("welcome", "Bienvenido a mi ecommerce");
  socket.emit("productos", productsManager.read());
  socket.on("nuevo producto", async (data) => {
    try {
      console.log(data);
      await productsManager.create(data);
      socketServer.emit("productos", productsManager.read());
    } catch (error) {
      console.log(error);
    }
  });
});

// Configuración del motor de vistas
server.engine("handlebars", engine());
server.set("view engine", "handlebars");
server.set("views", __dirname + "/src/views");

// Iniciar el servidor
httpServer.listen(PORT, ready);
