import express from "express";
import products from "./server/data/fs/files/product.fs.js";
import users from "./server/data/fs/files/user.fs.js";

const server = express();

const PORT = 8080;
const ready = () => console.log("Server ready on port " + PORT);

//middlewares
server.use(express.urlencoded({ extended: true }));

server.listen(PORT, ready);

//endpoints
server.get("/api/products", (req, res) => {
  try {
    const all = products.read();
    if (Array.isArray(all)) {
      return res.status(200).json(all);
    } else {
      return res.status(404).json({
        success: false,
        message: all,
      });
    }
    return res.status(200).json(all);
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

server.get("/api/products/:pid", (req,res)=>{
  const {pid} = req.params
  const one = products.readOne(pid)
  return res.status(200).json(one)
})

server.get("/api/users", (req, res) => {
  try {
    const all = users.read();
    if (Array.isArray(all)) {
      return res.status(200).json(all);
    } else {
      return res.status(404).json({
        success: false,
        message: all,
      });
    }
    return res.status(200).json(all);
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

server.get("/api/users/:uid", (req,res)=>{
  const {uid} = req.params
  const one = products.readOne(pid)
  return res.status(200).json(one)
})
