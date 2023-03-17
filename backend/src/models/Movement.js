import { DataTypes } from "sequelize";
import connection from "../database/connection.js";
import Client from "./Client.js";

const Movement = connection.define("movement", {
  type: {
    type: DataTypes.STRING,
    allowNull: false,
    required: true,
  },
  amount: {
    type: DataTypes.FLOAT,
    allowNull: false,
    required: true,
  },
  remainder: {
    type: DataTypes.FLOAT,
    allowNull: false,
    required: true,
  },
  previousDebit: {
    type: DataTypes.FLOAT,
    allowNull: false,
    required: true,
  },
  interest: {
    type: DataTypes.FLOAT,
    allowNull: false,
    required: true,
  },
  remainderDebit: {
    type: DataTypes.FLOAT,
    allowNull: false,
    required: true,
  },
});

Client.hasMany(Movement);
Movement.belongsTo(Client);

export default Movement;
