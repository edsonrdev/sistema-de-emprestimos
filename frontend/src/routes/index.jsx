import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

// app pages
import { Home } from "../pages/Home";
import { Register } from "../pages/Register";
import { Login } from "../pages/Login";
import { Dashboard } from "../pages/Dashboard";
import { Customers } from "../pages/Customers";
import { CustomerDetails } from "../pages/CustomerDetails";

export const Routes = () => (
  <Router>
    <Switch>
      <Route exact path="/">
        <Home />
      </Route>

      <Route path="/register">
        <Register />
      </Route>

      <Route path="/login">
        <Login />
      </Route>

      <Route path="/dashboard">
        <Dashboard />
      </Route>

      <Route exact path="/clients">
        <Customers />
      </Route>

      <Route path="/clients/:id">
        <CustomerDetails />
      </Route>

      <Route path="/account">
        <h1>Account</h1>
      </Route>
    </Switch>
  </Router>
);
