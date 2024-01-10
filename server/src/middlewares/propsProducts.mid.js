function propsProducts(req, res, next) {
  const { title, photo, price, stock } = req.body;
  if (!title || !photo || !price || !stock) {
    return res.json({
      statusCode: 400,
      response: `${req.method} ${req.url} All fields are required `,
    });
  } else {
    return next();
  }
}

export default propsProducts;
