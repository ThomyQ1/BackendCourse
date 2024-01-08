import express from "express";

import usersManager from "./data/fs/user.fs.js";
import productsManager from "./data/fs/product.fs.js";

const server = express();

const PORT = 8080;

const ready = () => console.log("Server ready on port: " + PORT);

server.listen(PORT, ready);

//middlewares
server.use(express.json());
server.use(express.urlencoded({ extended: true }));

server.get("/api/users", async (req, res) => {
  try {
    const all = await usersManager.read();

    if (all.length === 0) {
      return res.json({
        statusCode: 404,
        message: "Not found users",
      });
    }

    return res.json({
      statusCode: 200,
      response: all,
    });
  } catch (error) {
    console.log(error);
    return res.json({
      statusCode: 500,
      message: error.message,
    });
  }
});

server.get("/api/users/:uid", async (req, res) => {
  try {
    const { uid } = req.params;
    const one = await usersManager.readOne(uid);
    if (!one) {
      return res.json({
        statusCode: 404,
        message: "User not found",
      });
    }
    console.log(one);
    return res.json({
      statusCode: 200,
      response: one,
    });
  } catch (error) {
    console.log(error);
    return res.json({
      statusCode: 500,
      message: error.message,
    });
  }
});

server.get("/api/products", async (req, res) => {
  try {
    const all = await productsManager.read();
    if (all.length === 0) {
      return res.json({
        statusCode: 404,
        message: "Not found products",
      });
    }
    return res.json({
      statusCode: 200,
      response: all,
    });
  } catch (error) {
    console.log(error);
    return res.json({
      statusCode: 500,
      message: error.message,
    });
  }
});

server.get("/api/products/:pid", (req, res) => {
  try {
    const { pid } = req.params;

    const one = productsManager.readOne(pid);

    if (one !== null) {
      return res.json({
        statusCode: 200,
        response: one,
      });
    } else {
      return res.json({
        statusCode: 404,
        message: "Product not found",
      });
    }
  } catch (error) {
    console.log(error);
    return res.json({
      statusCode: 500,
      message: error.message,
    });
  }
});
