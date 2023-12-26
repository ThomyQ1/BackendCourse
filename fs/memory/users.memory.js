const crypto = require ("crypto")

class UserManager {
  static #Users = [];
  constructor() {}
  create(data) {
    try {
      if (!data.name || !data.photo || !data.email) {
        throw new Error("Name, Photo, Email are required");
      } else {
        const user = {
          id:crypto.randomBytes(12).toString("hex"),
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
  read() {
    try {
      const AllUsers = UserManager.#Users;
      if (AllUsers.length === 0) {
        throw new Error("There'nt Users");
      } else {
        return AllUsers;
      }
    } catch (error) {
      return error.message;
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
        return id
      } else {
        throw new Error("There'nt user with ID" + id);
      }
    } catch (error) {
      console.log(error.message);
      return error.message;
    }
  }
}

const User = new UserManager();
let Users = User.read();
console.log(Users);
const User1 = User.create({ name: "Thomy", photo: "photo", email: "email" });
const User2 = User.create({ name: "Leonel", photo: "photo", email: "email" });
const User3 = User.create({ name: "Quevedo" });
console.log(User1, User2, User3);
Users = User.read();
console.log(Users);
const One = User.readOne(1);
const Three = User.readOne(3);
console.log(One, Three);
