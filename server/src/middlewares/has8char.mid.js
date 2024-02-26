import has8charUtils from "../utils/has8char.js";

function has8char(req, res, next) {
  try {
    const { password } = req.body;
    has8charUtils(password); // Pasa la contraseña a la función has8charUtils
    return next();
  } catch (error) {
    return next(error);
  }
}

export default has8char;
