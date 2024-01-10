function propsProducts(req, res, next) {
  const { name, photo, email } = req.body;
  if (!data.name || !data.photo || !data.email) {
    return res.json({
      statusCode: 400,
      response: `${req.method} ${req.url} All fields are required `,
    });
  } else {
    return next();
  }
}

export default propsProducts;
