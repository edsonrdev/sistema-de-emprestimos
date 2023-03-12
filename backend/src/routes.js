import express from "express";
import UserController from "./controllers/UserController.js";

const routes = express.Router();

// user routes
routes.get("/", UserController.welcome);
routes.get("/users", UserController.all);
routes.post("/users", UserController.create);
routes.post("/users/login", UserController.login);
routes.put("/users", UserController.update);

export { routes };
