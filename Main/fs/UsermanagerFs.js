const fs = require("fs").promises;
const path = require("path");

class UserManager {
  #Users;

  constructor() {
    this.dataFolderPath = path.join(__dirname, "data");
    this.usersFilePath = path.join(this.dataFolderPath, "users.json");

    fs.mkdir(this.dataFolderPath, { recursive: true }).catch((error) => {
      console.error("Error creating data folder:", error.message);
    });

    this.#Users = this.readFromFile().catch((error) => {
      console.error("Error reading users file:", error.message);
      return [];
    });
  }

  async create(data) {
    try {
      if (!data.name || !data.photo || !data.email) {
        throw new Error("Name, Photo, Email are required");
      } else {
        const newUser = {
          id:
            (await this.#Users).length === 0
              ? 1
              : (await this.#Users)[(await this.#Users).length - 1].id + 1,
          name: data.name,
          photo: data.photo,
          email: data.email,
        };

        const updatedUsers = [...(await this.#Users), newUser];
        await this.writeToFile(updatedUsers);

        return newUser;
      }
    } catch (error) {
      return { error: error.message };
    }
  }

  async read() {
    try {
      return await this.#Users;
    } catch (error) {
      return { error: error.message };
    }
  }

  async readOne(id) {
    try {
      const users = await this.#Users;
      const oneUser = users.find((each) => each.id === Number(id));

      if (oneUser) {
        return oneUser;
      } else {
        throw new Error("There's no user with the given id");
      }
    } catch (error) {
      return { error: error.message };
    }
  }

  async readFromFile() {
    try {
      const data = await fs.readFile(this.usersFilePath, "utf-8");
      return JSON.parse(data);
    } catch (error) {
      if (error.code === "ENOENT") {
        return [];
      } else {
        throw error;
      }
    }
  }

  async writeToFile(users) {
    try {
      await fs.writeFile(this.usersFilePath, JSON.stringify(users, null, 2));
      this.#Users = users;
    } catch (error) {
      throw error;
    }
  }
}

const user = new UserManager();

(async () => {
  console.log(await user.read());
  console.log(
    await user.create({ name: "Thomy", photo: "photo", email: "email" })
  );
  console.log(
    await user.create({ name: "Leonel", photo: "photo", email: "email" })
  );
  console.log(await user.create({ name: "Quevedo" }));
  console.log(await user.read());
  console.log(await user.readOne(1));
  console.log(await user.readOne(3));
})();
