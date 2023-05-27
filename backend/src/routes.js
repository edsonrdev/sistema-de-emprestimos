import express from "express";
import UserController from "./controllers/UserController.js";
import ClientController from "./controllers/ClientController.js";
import LoanController from "./controllers/LoanController.js";
import MovementController from "./controllers/MovementController.js";

const routes = express.Router();

// user routes
routes.get("/users", UserController.findAll);
routes.post("/users", UserController.create);
routes.post("/users/login", UserController.login);
routes.put("/users", UserController.update);

// client routes
routes.post("/clientes", ClientController.create);
routes.get("/clientes", ClientController.findAll);
routes.get("/clientes/:id", ClientController.findById);
routes.put("/clientes/:id", ClientController.update);

routes.post("/clientes/loan", ClientController.createLoan);
routes.patch("/clientes/rate", ClientController.updateInterestRate);

// loan routes
routes.post("/emprestimos", LoanController.create);
routes.get("/emprestimos", LoanController.findAll);

// movement routes
routes.get("/movements", MovementController.findAll);
routes.post("/movements", MovementController.create);

export { routes };
