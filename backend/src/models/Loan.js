import { DataTypes } from "sequelize";
import connection from "../database/connection.js";
import Client from "./Client.js";

const Loan = connection.define("loan", {
  total: {
    type: DataTypes.FLOAT,
    allowNull: false,
    required: true,
  },
  paid: {
    type: DataTypes.FLOAT,
    defaultValue: 0,
  },
  portion: {
    type: DataTypes.FLOAT,
    allowNull: false,
    required: true,
  },
  remainder: {
    type: DataTypes.VIRTUAL,
    get() {
      if (this.getDataValue("paid")) {
        return this.getDataValue("total") - this.getDataValue("paid");
      }
      return this.getDataValue("total");
    },
  },
});

Client.hasMany(Loan);
Loan.belongsTo(Client);

export default Loan;
