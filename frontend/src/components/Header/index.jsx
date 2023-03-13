import { Container } from "./styles";
import { Profile } from "../Profile";
import { Link } from "react-router-dom";

export const Header = ({ active }) => {
  return (
    <Container>
      <div className="container">
        <ul className="links">
          <li>
            <Link
              to="/dashboard"
              className={active === "dashboard" ? "active" : undefined}
            >
              Dashboard
            </Link>
          </li>
          <li>
            <Link
              to="/customers"
              className={active === "customers" ? "active" : undefined}
            >
              Clientes
            </Link>
          </li>
          <li>
            <Link
              to="/loans"
              className={active === "loans" ? "active" : undefined}
            >
              Empréstimos
            </Link>
          </li>
        </ul>

        <Profile />
      </div>
    </Container>
  );
};
