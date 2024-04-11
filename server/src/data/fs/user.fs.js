import fs from "fs";
import crypto from "crypto";

class UserManager {
  static #users = [];

  init() {
    const exist = fs.existsSync(this.path);
    if (!exist) {
      fs.writeFileSync(this.path, JSON.stringify([], null, 2));
    } else {
      UserManager.#users = JSON.parse(fs.readFileSync(this.path, "utf-8"));
    }
  }

  constructor(path) {
    this.path = path;
    this.init();
  }

  async create(data) {
    try {
      UserManager.#users.push(user);
      await fs.promises.writeFile(
        this.path,
        JSON.stringify(UserManager.#users, null, 2)
      );
      console.log("Created Id: " + user.id);
      return user.id;
    } catch (error) {
      console.error("Error in create:", error.message);
      throw error;
    }
  }

  read({ filter, options }) {
    try {
      let data = UserManager.#users;
      if (filter) {
        data = data.filter((item) => {
          return item.name === filter.name;
        });
      }
      if (options) {
        if (options.page && options.limit) {
          const startIndex = (options.page - 1) * options.limit;
          const endIndex = options.page * options.limit;
          data = data.slice(startIndex, endIndex);
        }
      }
      if (data.length === 0) {
        throw new Error("Not Found");
      } else {
        console.log(data);
        return data;
      }
    } catch (error) {
      console.log(error.message);
      return error.message;
    }
  }

  readOne(id) {
    const one = UserManager.#users.find((each) => each._id === id);
    if (one) {
      console.log(one);
      return one;
    } else {
      console.log("There isn't a user with ID " + id);
      return null;
    }
  }

  async destroy(id) {
    try {
      const one = UserManager.#users.find((each) => each._id === id);
      if (one) {
        UserManager.#users = UserManager.#users.filter(
          (each) => each.id !== id
        );
        await fs.promises.writeFile(
          this.path,
          JSON.stringify(UserManager.#users, null, 2)
        );
        console.log("Destroyed ID: " + id);
        return id;
      } else {
        throw new Error("There isn't a user with ID " + id);
      }
    } catch (error) {
      console.error("Error in destroy:", error.message);
      throw error;
    }
  }
}

const usersManager = new UserManager("./src/data/fs/files/users.json");
export default usersManager;
