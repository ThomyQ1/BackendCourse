import { Router } from "express";
import usersManager from "../../data/fs/user.fs.js";
import propsUsers from "../../middlewares/propsUsers.mid.js";

const usersRouter = Router();
usersRouter.post("/", propsUsers, async (req, res) => {
  try {
    const data = req.body;
    const response = await usersManager.create(data);

    return res.status(201).json({
      statusCode: 201,
      message: "created",
      response,
    });
  } catch (error) {
    return next(error);
  }
});
usersRouter.get("/", async (req, res, next) => {
  try {
    const all = await usersManager.read();
    if (Array.isArray(all)) {
      return res.json({
        statusCode: 200,
        response: all,
      });
    } else {
      return res.json({
        statusCode: 404,
        message: all,
      });
    }
  } catch (error) {
    return next(error);
  }
});
usersRouter.get("/:uid", async (req, res) => {
  try {
    const { pid } = req.params;
    const one = await usersManager.readOne(pid);

    if (one === "Producto no encontrado") {
      return res.status(404).json({
        statusCode: 404,
        response: "User not founded",
      });
    } else {
      return res.status(200).json({
        statusCode: 200,
        response: one,
      });
    }
  } catch (error) {
    return next(error);
  }
});

export default usersRouter;
