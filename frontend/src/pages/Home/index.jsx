import { Link } from "react-router-dom";
import { Button } from "../../components/Button";
import { Container } from "./styles";
import { useHistory } from "react-router-dom";

export const Home = () => {
  const history = useHistory();

  return (
    <Container>
      <h1>Controle de Empréstimos</h1>

      <p>
        Tenha paz e tranquilidade, mantendo o controle dos seus empréstimos em
        um só lugar!
      </p>

      <div>
        {/* <Link to="/register">Criar conta</Link>
        <Link to="/login">Entrar</Link> */}
        <Button
          text="Criar conta"
          type="button"
          typeUIButton="dark"
          size="lg"
          onClick={() => history.push("/register")}
        />
        <Button
          text="Entrar"
          type="button"
          typeUIButton="default"
          size="lg"
          onClick={() => history.push("/login")}
        />
        {/* <Button
          text="Entrar"
          type="button"
          typeUIButton="default"
          size="md"
          onClick={() => history.push("/login")}
        />
        <Button
          text="Entrar"
          type="button"
          typeUIButton="default"
          size="sm"
          onClick={() => history.push("/login")}
        /> */}
      </div>
    </Container>
  );
};
