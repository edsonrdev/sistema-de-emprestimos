import { DataTypes } from "sequelize";
import connection from "../database/connection.js";

const User = connection.define("user", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    required: true,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    required: true,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
    required: true,
  },
  photo: {
    type: DataTypes.STRING,
    defaultValue: "",
  },
});

export default User;
