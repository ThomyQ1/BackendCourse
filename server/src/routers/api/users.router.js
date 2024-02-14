import { Router, response } from "express";
import { users } from "../../data/mongo/manager.mongo.js";
import propsUsers from "../../middlewares/propsUsers.mid.js";

const usersRouter = Router();

usersRouter.post("/", propsUsers, async (req, res, next) => {
  try {
    const data = req.body;
    if (!data || Object.keys(data).length === 0) {
      return res.status(400).json({
        statusCode: 400,
        response: "Datos inválidos en el cuerpo de la solicitud",
      });
    }

    const userId = await users.create(data);

    return res.status(201).json({
      statusCode: 201,
      response: {
        message: "Usuario creado",
        userId,
      },
    });
  } catch (error) {
    return next(error);
  }
});

usersRouter.get("/", async (req, res, next) => {
  try {
    const orderAndPaginate = {
      limit: req.query.limit || 10,
      page: req.query.page || 1,
      sort: {},
    };

    const filter = {};
    if (req.query.email) {
      filter.email = new RegExp(req.query.email.trim(), "i");
    }

    if (req.query.order === "desc") {
      orderAndPaginate.sort.name = -1;
    } else {
      orderAndPaginate.sort.name = 1;
    }

    const all = await users.read(filter, orderAndPaginate);

    if (Array.isArray(all.docs) && all.docs.length > 0) {
      return res.json({
        statusCode: 200,
        response: {
          message: "Usuarios encontrados",
          users: all.docs,
        },
      });
    } else {
      return res.status(404).json({
        statusCode: 404,
        response: {
          message: "No se encontraron usuarios",
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
    const one = await users.readOne(uid);

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
          response: one,
        },
      });
    }
  } catch (error) {
    return next(error);
  }
});

usersRouter.put("/:uid", async (req, res, next) => {
  try {
    const { uid } = req.params;
    const data = await users.update(uid, data);
    return res.json({
      statusCode: 200,
      response: one,
    });
  } catch (error) {
    return next(error);
  }
});

usersRouter.delete("/:uid", async (req, res, next) => {
  try {
    const { uid } = req.params;
    const one = await users.destroy(uid);
    return res.json({
      statusCode: 200,
      response: one,
    });
  } catch (error) {
    return next(error);
  }
});

export default usersRouter;
