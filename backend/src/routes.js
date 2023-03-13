import express from "express";
import UserController from "./controllers/UserController.js";

const routes = express.Router();

// user routes
routes.get("/", UserController.welcome);
routes.get("/users", UserController.all);
routes.post("/users", UserController.create);
routes.post("/users/login", UserController.login);
routes.put("/users", UserController.update);

// client routes
routes.get("/clients", ClientController.all);
routes.post("/clients", ClientController.create);
routes.post("/clients/:id", ClientController.find);

export { routes };
