function propsProducts(req, res, next) {
    const { uid, pid, quantity, state } = req.body;
    if (!uid || !pid || !quantity || !state) {
      return res.json({
        statusCode: 400,
        response: `${req.method} ${req.url} All fields are required `,
      });
    } else {
      return next();
    }
  }
  
  export default propsProducts;
  