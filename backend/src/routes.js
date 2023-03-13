import express from "express";
import UserController from "./controllers/UserController.js";
import ClientController from "./controllers/ClientController.js";
import LoanController from "./controllers/LoanController.js";

const routes = express.Router();

// user routes
routes.get("/users", UserController.findAll);
routes.post("/users", UserController.create);
routes.post("/users/login", UserController.login);
routes.put("/users", UserController.update);

// client routes
routes.get("/clients", ClientController.findAll);
routes.get("/clients/inactives", ClientController.findInactives);
routes.get("/clients/:id", ClientController.findById);
routes.post("/clients", ClientController.create);
routes.put("/clients", ClientController.update);
routes.patch("/clients/inactivate", ClientController.inactivate);

// loan routes
routes.get("/loans", LoanController.findAll);

export { routes };
