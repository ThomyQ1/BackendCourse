  import repository from "../repositories/users.repositories.js";
  import sendEmail from "../utils/sendEmail.js";

  class UsersService {
    constructor() {
      this.repository = repository;
    }

    create = async (data) => await this.repository.create(data);
    read = async ({ filter, options }) => await this.repository.read({ filter, options });
    readOne = async (id) => await this.repository.readOne(id);
    readByEmail = async (email) => await this.repository.readByEmail(email);
    update = async (id, data) => await this.repository.update(id, data);
    destroy = async (id) => await this.repository.destroy(id);

    async register(data) {
      try {
        const existingUser = await this.repository.readByEmail(data.email);
        if (existingUser) {
          throw new Error('User already exists');
        }
  
        const newUser = await this.repository.create(data);
        await sendEmail(data);
        return newUser;
      } catch (error) {
        throw error;
      }
    }
  }

  const service = new UsersService();
  export default service;

