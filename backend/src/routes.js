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
routes.get("/clients", ClientController.findAll);
routes.get("/clients/actives", ClientController.findActives);
routes.get("/clients/inactives", ClientController.findInactives);
routes.get("/clients/:id", ClientController.findById);
routes.post("/clients", ClientController.create);
routes.put("/clients/:id", ClientController.update);
routes.patch("/clients/inactivate/:id", ClientController.inactivate);

routes.post("/clients/loan", ClientController.createLoan);

// loan routes
routes.get("/loans", LoanController.findAll);
routes.post("/loans", LoanController.create);

// movement routes
routes.get("/movements", MovementController.findAll);
routes.get("/movements/loan/:id", MovementController.findByLoan);
routes.post("/movements", MovementController.create);

export { routes };
