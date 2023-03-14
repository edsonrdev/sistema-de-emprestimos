import { DataTypes } from "sequelize";
import connection from "../database/connection.js";
import Loan from "./Loan.js";

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
});

Loan.hasMany(Movement);
Movement.belongsTo(Loan);

export default Movement;
