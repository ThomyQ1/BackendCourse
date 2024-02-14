import { Router } from "express";
import { users } from "../../data/mongo/manager.mongo.js";
import has8char from "../../middlewares/has8char.mid.js";
import isValidPass from "../../middlewares/isValidPass.mid.js";

const sessionsRouter = Router();

sessionsRouter.post("/register", has8char, async (req, res, next) => {
  try {
    const data = req.body;
    const one = await users.create(data);
    return res.json({
      statusCode: 201,
      response: "Registered",
    });
  } catch (error) {
    return next(error);
  }
});

sessionsRouter.post("/login", isValidPass, async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (email && password === "hola1234") {
      req.session.email = email;
      req.session.role = "user";
      return res.json({
        statusCode: 200,
        message: "Logged in!",
        session: req.session,
      });
    }
    const error = new Error("Bad Auth");
    error.statusCode = 401;
    throw error;
  } catch (error) {
    return next(error);
  }
});

sessionsRouter.post("/", async (req, res, next) => {
  try {
    if (req.session.email) {
      return res.json({
        statusCode: 200,
        response: "Session with email: " + req.session.email,
      });
    } else {
      const error = new Error("No auth");
      error.statusCode = 400;
      throw error;
    }
  } catch (error) {
    return next(error);
  }
});

sessionsRouter.post("/signout", async (req, res, next) => {
  try {
    if (req.session.email) {
      req.session.destroy();
      return res.json({
        statusCode: 200,
        response: "Signed out",
      });
    } else {
      const error = new Error("No auth");
      error.statusCode = 400;
      throw error;
    }
  } catch (error) {
    return next(error);
  }
});

export default sessionsRouter;
