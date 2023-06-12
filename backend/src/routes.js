import express from "express";
import UserController from "./controllers/UserController.js";
import ClientController from "./controllers/ClientController.js";
import LoanController from "./controllers/LoanController.js";
import ParcelController from "./controllers/ParcelController.js";

const routes = express.Router();

// user routes
routes.get("/usuarios", UserController.findAll);
routes.post("/usuarios", UserController.create);
routes.post("/usuarios/login", UserController.login);
routes.put("/usuarios", UserController.update);

// client routes
routes.get("/clientes", ClientController.findAll);
routes.post("/clientes", ClientController.create);
routes.get("/clientes/:id", ClientController.findById);
routes.put("/clientes/:id", ClientController.update);

// loan routes
routes.get("/emprestimos", LoanController.findAll);
routes.post("/emprestimos", LoanController.create);
routes.put("/emprestimos", LoanController.toPay);

// parcel routes
routes.get("/parcelas", ParcelController.findAll);

export { routes };
