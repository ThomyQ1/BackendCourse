import OrderDTO from "../dto/orders.dto.js";
import dao from "../data/index.factory.js";
const { orders } = dao;

class OrdersRep {
  constructor() {
    this.model = orders;
  }
  create = async (data) => {
    data = new OrderDTO(data);
    const response = await this.model.create(data);
    return response;
  };
  read = async ({ filter, options }) =>
    await this.model.read({ filter, options });
  readOne = async (oid) => await this.model.readOne(oid);
  update = async (oid, quantity, state) =>
    await this.update(oid, quantity, state);
  destroy = async (oid) => await this.model.destroy(oid);
}

const repository = new OrdersRep();
export default repository;
