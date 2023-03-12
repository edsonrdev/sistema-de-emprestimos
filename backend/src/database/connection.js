import mysql from "mysql2";
import { Sequelize } from "sequelize";

const connection = new Sequelize("controledeemprestimos", "root", "12345", {
  host: "localhost",
  dialect: "mysql",
});

try {
  connection.authenticate();
} catch (err) {
  console.log(`Connection failed! Error: ${err}`);
}

export default connection;
