import repository from "../repositories/orders.repositories.js";

class OrdersServices {
  constructor() {
    this.repository = repository;
  }
  create = async (data) => {
    try {
      const response = await this.repository.create(data);
      return response;
    } catch (error) {
      return error;
    }
  };
  read = async ({ options, filter }) => {
    try {
      const response = await this.repository.read({ options, filter });
      return response;
    } catch (error) {
      throw error;
    }
  };
  report = async (uid) => {
    try {
      const response = await this.repository.reportBill(uid);
      return response;
    } catch (error) {
      throw error;
    }
  };
  update = async (data) => {
    try {
      const response = await this.repository.update({ id, data });
      return response;
    } catch (error) {
      throw error;
    }
  };
  destroy = async (id) => {
    try {
      const response = await this.repository.destroy(id);
      return response;
    } catch (error) {
      throw error;
    }
  };
}

const service = OrdersServices;
export default service;
