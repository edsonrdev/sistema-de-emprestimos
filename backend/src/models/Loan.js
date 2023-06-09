import { DataTypes } from "sequelize";
import connection from "../database/connection.js";
import Client from "./Client.js";

const Loan = connection.define("loan", {
  value: {
    type: DataTypes.FLOAT,
    allowNull: false,
    required: true,
  },
  portion: {
    type: DataTypes.FLOAT,
    allowNull: false,
    required: true,
  },
  finished: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  current: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },
});

Client.hasMany(Loan);
Loan.belongsTo(Client);

export default Loan;
