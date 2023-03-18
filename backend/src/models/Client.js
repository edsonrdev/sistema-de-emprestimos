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
  active: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },

  // attributes of the loan
  initial: {
    type: DataTypes.FLOAT,
    defaultValue: 0,
  },
  total: {
    type: DataTypes.FLOAT,
    defaultValue: 0,
  },
  portion: {
    type: DataTypes.FLOAT,
    defaultValue: 0,
  },
  paid: {
    type: DataTypes.FLOAT,
    defaultValue: 0,
  },
});

export default Client;
