function propsUsers(req, res, next) {
  const { name, photo, email } = req.body;
  if (!name || !photo || !email) {
    return res.status(400).json({
      statusCode: 400,
      response: `${req.method} ${req.url} All fields are required `,
    });
  } else {
    return next();
  }
}

export default propsUsers;
