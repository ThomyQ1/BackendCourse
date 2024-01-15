import { Router } from "express";
import usersManager from "../../data/fs/user.fs.js";
import propsUsers from "../../middlewares/propsUsers.mid.js";

const usersRouter = Router();

usersRouter.post("/", propsUsers, async (req, res, next) => {
  try {
    const data = req.body;
    if (!data || Object.keys(data).length === 0) {
      response: "Invalid data in the request body";
    }

    const userId = await usersManager.create(data);

    return res.status(201).json({
      statusCode: 201,
      response: {
        message: "User created",
        userId,
      },
    });
  } catch (error) {
    return res.status(500).json({
      statusCode: 500,
      response: {
        error: error.message,
      },
    });
  }
});

usersRouter.get("/", async (req, res, next) => {
  try {
    const all = await usersManager.read();
    if (Array.isArray(all) && all.length > 0) {
      return res.json({
        statusCode: 200,
        response: {
          message: "Users found",
          users: all,
        },
      });
    } else {
      return res.status(404).json({
        statusCode: 404,
        response: {
          message: "No users found",
        },
      });
    }
  } catch (error) {
    return res.status(500).json({
      statusCode: 500,
      response: {
        error: error.message,
      },
    });
  }
});

usersRouter.get("/:uid", async (req, res, next) => {
  try {
    const { uid } = req.params;
    const one = await usersManager.readOne(uid);

    if (!one) {
      return res.status(404).json({
        statusCode: 404,
        response: {
          message: "User not found",
        },
      });
    } else {
      return res.status(200).json({
        statusCode: 200,
        response: {
          message: "User found",
          user: one,
        },
      });
    }
  } catch (error) {
    return res.status(500).json({
      statusCode: 500,
      response: {
        error: error.message,
      },
    });
  }
});

export default usersRouter;
