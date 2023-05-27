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
  // movements: {

  // }
  // totalInitial: {
  //   type: DataTypes.FLOAT,
  //   defaultValue: 0,
  // },
  // //   totalNow: {
  // total: {
  //   type: DataTypes.FLOAT,
  //   defaultValue: 0,
  // },
  // paidInitial: {
  //   type: DataTypes.FLOAT,
  //   defaultValue: 0,
  // },
  // //   paidNow: {
  // paid: {
  //   type: DataTypes.FLOAT,
  //   defaultValue: 0,
  // },
  // portion: {
  //   type: DataTypes.FLOAT,
  //   defaultValue: 0,
  // },
  // interestRate: {
  //   type: DataTypes.FLOAT,
  //   defaultValue: 0.1,
  // },
});

Client.hasMany(Loan);
Loan.belongsTo(Client);

export default Loan;
