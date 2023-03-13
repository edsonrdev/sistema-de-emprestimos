import express from "express";
import UserController from "./controllers/UserController.js";
import ClientController from "./controllers/ClientController.js";

const routes = express.Router();

// user routes
routes.get("/", UserController.welcome);
routes.get("/users", UserController.all);
routes.post("/users", UserController.create);
routes.post("/users/login", UserController.login);
routes.put("/users", UserController.update);

// client routes
routes.get("/clients", ClientController.all);
routes.get("/clients/:id", ClientController.find);
routes.post("/clients", ClientController.create);

export { routes };
