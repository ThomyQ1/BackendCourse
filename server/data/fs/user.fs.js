import fs from "fs";
import crypto from "node:crypto";

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
      if (!data.name || !data.photo || !data.email) {
        throw new Error("Name, Photo, Email are required");
      } else {
        const user = {
          id: crypto.randomBytes(12).toString("hex"),
          name: data.name,
          photo: data.photo,
          email: data.email,
        };
        UserManager.#users.push(user);
        await fs.promises.writeFile(
          this.path,
          JSON.stringify(UserManager.#users, null, 2)
        );
        console.log("Created Id:" + user.id);
        return user.id;
      }
    } catch (error) {
      console.log(error.message);
      return error.message;
    }
  }
  read() {
    if (UserManager.#users.length === 0) {
      console.log("There aren't any users");
      return [];
    } else {
      console.log(UserManager.#users);
      return UserManager.#users;
    }
  }

  readOne(id) {
    const one = UserManager.#users.find((each) => each.id === id);

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
      const one = UserManager.#users.find((each) => each.id === id);
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
        throw new Error("There'nt user with ID" + id);
      }
    } catch (error) {
      console.log(error.message);
      return error.message;
    }
  }
}

const usersManager = new UserManager("./data/fs/files/users.json");
export default usersManager;
