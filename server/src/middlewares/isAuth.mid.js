import { verifyToken } from "../utils/token.js";

export default (req, res, next) => {
  try {
    const token = req.cookies;
    const userData = verifyToken(token);
    if (userData) {
      return next();
    } else {
      const error = new Error("Bad auth from middleware");
      error.statusCode = 401;
      throw error;
    }
  } catch (error) {
    return next(error);
  }
};
