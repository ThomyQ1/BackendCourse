import env from "./src/utils/env.js";
import express from "express";
import IndexRouter from "./src/routers/index.router.js";
import productsManager from "./src/data/fs/product.fs.js";
import errorHandler from "./src/middlewares/errorHandler.mid.js";
import pathHandler from "./src/middlewares/pathHandler.mid.js";
import __dirname from "./utils.js";
import morgan from "morgan";
import { engine } from "express-handlebars";
import { createServer } from "http";
import { Server } from "socket.io";
import dbConnection from "./src/utils/db.js";
import cookieParser from "cookie-parser";
import expressSession from "express-session";
import sessionFileStore from "session-file-store";
import MongoStore from "connect-mongo";
import args from "./src/utils/args.js";
import compression from "express-compression";
import winston from "./src/middlewares/winston.js";
import options from "./src/config/swagger.js";
import swaggerJSDoc from "swagger-jsdoc";
import { serve, setup } from "swagger-ui-express";

const server = express();
const PORT = env.PORT || 8080;
const ready = () => {
  console.log("Servidor listo en el puerto: " + PORT);
  dbConnection();
};
const httpServer = createServer(server);
const socketServer = new Server(httpServer);
const specs = swaggerJSDoc(options);

// Configuración de middlewares y rutas
server.use("/api/docs", serve, setup(specs));
const FileStore = sessionFileStore(expressSession);
server.use(cookieParser(process.env.SECRET_KEY));

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
server.use(winston);
const router = new IndexRouter();
server.use("/", router.getRouter());
server.use(errorHandler);
server.use(pathHandler);
server.use(
  compression({
    brotli: { enabled: true, zlib: {} },
  })
);

// Configuración de Socket.IO
socketServer.on("connection", (socket) => {
  socket.emit("bienvenido", "Bienvenido a mi ecommerce");
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
