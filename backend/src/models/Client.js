import { DataTypes } from "sequelize";
import connection from "../database/connection.js";

const Client = connection.define("client", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    required: true,
  },
  phone: {
    type: DataTypes.STRING,
    defaultValue: "",
  },
  address: {
    type: DataTypes.STRING,
    allowNull: false,
    required: true,
  },
});

export default Client;
