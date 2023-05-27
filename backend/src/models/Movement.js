import { DataTypes } from "sequelize";
import connection from "../database/connection.js";
import Loan from "./Loan.js";

const Movement = connection.define("movement", {
  // type: {
  //   type: DataTypes.STRING,
  //   allowNull: false,
  //   required: true,
  // },
  expireDate: {
    type: DataTypes.DATE,
  },
  expired: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  remainderValue: {
    type: DataTypes.FLOAT,
    allowNull: false,
    required: true,
  },

  // specific data loan
  // previous: {
  //   type: DataTypes.FLOAT,
  //   allowNull: false,
  //   required: true,
  // },
  // interest: {
  //   type: DataTypes.FLOAT,
  //   allowNull: false,
  //   required: true,
  // },
  // remainder: {
  //   type: DataTypes.FLOAT,
  //   allowNull: false,
  //   required: true,
  // },
  // interestRatePrevious: {
  //   type: DataTypes.FLOAT,
  //   allowNull: false,
  //   required: true,
  // },
});

Loan.hasMany(Movement);
Movement.belongsTo(Loan);

export default Movement;
