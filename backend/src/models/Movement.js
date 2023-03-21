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

  // specific data loan
  previous: {
    type: DataTypes.FLOAT,
    allowNull: false,
    required: true,
  },
  interest: {
    type: DataTypes.FLOAT,
    allowNull: false,
    required: true,
  },
  remainder: {
    type: DataTypes.FLOAT,
    allowNull: false,
    required: true,
  },
  interestRatePrevious: {
    type: DataTypes.FLOAT,
    allowNull: false,
    required: true,
  },
});

Client.hasMany(Movement);
Movement.belongsTo(Client);

export default Movement;
