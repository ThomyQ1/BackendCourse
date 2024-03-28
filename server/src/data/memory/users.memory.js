import crypto from "crypto";

class UserManager {
  static #Users = [];
  constructor() {}
  create(data) {
    try {
      if (!data.name || !data.photo || !data.email) {
        throw new Error("Name, Photo, Email are required");
      } else {
        const user = {
          id: crypto.randomBytes(12).toString("hex"),
          name: data.name,
          photo: data.photo,
          email: data.email,
        };
        UserManager.#Users.push(user);
        return user;
      }
    } catch (error) {
      return error.message;
    }
  }
  read({ filter, options }) {
    try {
      let data = UserManager.#Users;
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
        return { statusCode: 404, response: null };
      } else {
        return { statusCode: 200, response: data };
      }
    } catch (error) {
      return { statusCode: 500, response: null };
    }
  }
  readOne(id) {
    try {
      const OneUser = UserManager.#Users.find((each) => each.id === id);
      if (OneUser) {
        return OneUser;
      } else {
        throw new Error("There'nt user with ID" + id);
      }
    } catch (error) {
      return error.message;
    }
  }

  destroy(id) {
    try {
      const one = UserManager.#Users.find((each) => each.id === id);
      if (one) {
        UserManager.#Users = UserManager.#Users.filter(
          (each) => each.id !== id
        );
        console.log("Destroyed ID: " + id);
        return id;
      } else {
        throw new Error("There'nt user with ID" + id);
      }
    } catch (error) {
      console.log(error.message);
      return error.message;
    }
  }
}

const user = new UserManager();
export default user;
