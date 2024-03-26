import { orders } from "../data/mongo/manager.mongo.js";

class OrdersServices {
  constructor() {
    this.model = orders;
  }
  create = async (data) => {
    try {
      const response = await this.model.create(data);
      return response;
    } catch (error) {
      return error;
    }
  };
  read = async ({ options, filter }) => {
    try {
      const response = await this.model.read({ options, filter });
      return response;
    } catch (error) {
      throw error;
    }
  };
  report = async (uid) => {
    try {
      const response = await this.model.reportBill(uid);
      return response;
    } catch (error) {
      throw error;
    }
  };
  update = async (data) => {
    try {
      const response = await this.model.update({ id, data });
      return response;
    } catch (error) {
      throw error;
    }
  };
  destroy = async (id) => {
    try {
      const response = await this.model.destroy(id);
      return response;
    } catch (error) {
      throw error;
    }
  };
}

const service = OrdersServices;
export default service;
