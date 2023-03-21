import { DataTypes } from "sequelize";
import connection from "../database/connection.js";

const Client = connection.define("client", {
  // atributos específicos do cliente
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

  // atributos do empréstimo do cliente
  totalInitial: {
    type: DataTypes.FLOAT,
    defaultValue: 0,
  },
  total: {
    type: DataTypes.FLOAT,
    defaultValue: 0,
  },
  paidInitial: {
    type: DataTypes.FLOAT,
    defaultValue: 0,
  },
  paid: {
    type: DataTypes.FLOAT,
    defaultValue: 0,
  },
  portion: {
    type: DataTypes.FLOAT,
    defaultValue: 0,
  },
  interestRate: {
    type: DataTypes.FLOAT,
    defaultValue: 0.1,
  },
});

export default Client;
