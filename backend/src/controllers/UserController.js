import connection from "../database/connection.js";
import User from "../models/User.js";
import bcrypt from "bcrypt";
import createUserToken from "../helpers/createUserToken.js";

class UserController {
  // LIST ALL USERS
  static async findAll(req, res) {
    const users = await User.findAll();
    return res.json(users);
  }

  // CREATE A NEW USER
  static async create(req, res) {
    const { name, email, password, passwordConfirm } = req.body;

    if (!name || !email || !password || !passwordConfirm) {
      return res.status(422).json({ message: "All fields are required!" });
    }

    if (!/^[\w+.]+@\w+\.\w{2,}(?:\.\w{2})?$/.test(email)) {
      return res.status(422).json({ message: "Email is invalid!" });
    }

    const emailAlreadyExists = await User.findOne({ where: { email: email } });

    if (emailAlreadyExists) {
      return res.status(422).json({ message: "E-mail already registered!" });
    }

    if (password !== passwordConfirm) {
      return res.status(422).json({ message: "Passwords do not match!" });
    }

    const salt = await bcrypt.genSalt(12);
    const passwordHash = await bcrypt.hash(password, salt);

    const user = await User.create({
      name,
      email,
      password: passwordHash,
    });

    return res.json(user);
  }

  // MAKE LOGIN USER
  static async login(req, res) {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(422).json({ message: "All fields are required!" });
    }

    const user = await User.findOne({ where: { email: email } });

    if (!user) {
      return res.status(422).json({ message: "User not found!" });
    }

    const checkPassword = await bcrypt.compare(password, user?.password);

    if (!checkPassword) {
      return res.status(422).json({ message: "The password is incorrect!" });
    }

    await createUserToken(user, req, res);
  }

  // UPDATE A USER (NAME AND PHOTO)
  static async update(req, res) {
    const { id, name, photo } = req.body;

    if (!id || !name) {
      return res.status(422).json({ message: "All fields are required!" });
    }

    const updatedUser = await User.update(
      { name, photo },
      {
        where: {
          id: id,
        },
      }
    );

    if (!updatedUser[0]) {
      res.json({ message: "Error updating user data!" });
    }

    res.json(updatedUser[0]);
  }
}

export default UserController;
