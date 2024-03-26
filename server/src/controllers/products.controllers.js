import service from "../services/products.services.js";

class ProductsController {
  constructor() {
    this.service = service;
  }
  create = async (req, res, next) => {
    try {
      const data = req.body;
      const response = await this.service.create(data);
      return res.success201(response);
    } catch (error) {
      return next(error);
    }
  };
  read = async (req, res, next) => {
    try {
      const filter = { category: req.params.category };
      const order = { order: req.query.order };
      const all = await this.service.read({});
      return res.success200(all);
    } catch (error) {
      return next(error);
    }
  };
  readOne = async (req, res, next) => {
    try {
      const { pid } = req.params;
      const one = await this.service.readOne(pid);

      if (one === "Producto no encontrado") {
        return res.status(404).json({
          statusCode: 404,
          message: "Producto no encontrado",
        });
      } else {
        return res.success200(one);
      }
    } catch (error) {
      return next(error);
    }
  };
  update = async (req, res, next) => {
    try {
      const { pid, quantity } = req.params;
      const response = await this.service.update(quantity, pid);
      if (response) {
        return res.success200(response);
      }
    } catch (error) {
      return next(error);
    }
  };
  destroy = async (req, res, next) => {
    try {
      const { pid } = req.params;
      const response = await this.service.destroy(pid);
      if (response === "There'nt any products") {
        return res.error404(response);
      } else {
        return res.success200(response);
      }
    } catch (error) {
      return next(error);
    }
  };
}

export default ProductsController;
const controller = new ProductsController();
const { create, read, readOne, update, destroy } = controller;
export { create, read, readOne, update, destroy };
