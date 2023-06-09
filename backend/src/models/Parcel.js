import { DataTypes } from "sequelize";
import connection from "../database/connection.js";
import Loan from "./Loan.js";

const Parcel = connection.define("parcel", {
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
  previousValue: {
    type: DataTypes.FLOAT,
    defaultValue: 0,
  },
  paidValue: {
    type: DataTypes.FLOAT,
    defaultValue: 0,
  },
  status: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
  current: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    required: true,
  },
});

Loan.hasMany(Parcel);
Parcel.belongsTo(Loan);

export default Parcel;
