import express from "express";
import cors from "cors";

// import database connection
import connection from "./database/connection.js";

// import the models and routes
import { routes } from "./routes.js";

// init application
const PORT = process.env.PORT || 3333;
const app = express();

// set middlewares
app.use(express.json());
app.use(cors());
app.use(routes);

// run the server and build the models, if a connection is OK
connection
  .sync()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server started in port ${PORT}`);
    });
  })
  .catch((err) => {
    console.log(`Error: ${err}`);
  });
