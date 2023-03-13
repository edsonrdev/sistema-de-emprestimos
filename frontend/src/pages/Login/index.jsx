import { Link } from "react-router-dom";
import { Container } from "./styles";
import { Button } from "../../components/Button";

export const Login = () => {
  return (
    <Container>
      <section>
        <h1>Entrar na conta</h1>
        <p>
          Entre agora na sua conta e gerencie todos os seus empréstimos em um só
          lugar!
        </p>
      </section>

      <section>
        <form>
          <div className="form-group">
            <label htmlFor="email">E-mail:</label>
            <input type="email" id="email" required />
          </div>

          <div className="form-group">
            <label htmlFor="password">Senha:</label>
            <input type="password" id="password" />
          </div>

          <Button
            size="lg"
            typeUIButton="default"
            text="Entrar"
            type="submit"
          />

          <Link to="/">Voltar para Home</Link>
        </form>
      </section>
    </Container>
  );
};
