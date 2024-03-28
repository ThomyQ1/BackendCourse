import MongoManager from "../mongo/manager.mongo.js";
import User from "./models/user.model.js";

const users = new MongoManager(User);
export default users;
