import { Link } from "react-router-dom";
import { Container } from "./styles";
import { Button } from "../../components/Button";

export const Register = () => {
  return (
    <Container>
      <section>
        <h1>Criar conta</h1>
        <p>Crie sua conta hoje mesmo e controle melhor os seus empréstimos!</p>
      </section>

      <section>
        <form>
          <div className="form-group">
            <label htmlFor="name">Nome:</label>
            <input type="text" id="name" />
          </div>

          <div className="form-group">
            <label htmlFor="email">E-mail:</label>
            <input type="email" id="email" required />
          </div>

          <div className="form-group">
            <label htmlFor="password">Senha:</label>
            <input type="password" id="password" />
          </div>

          <div className="form-group">
            <label htmlFor="passwordConfirm">Confirme a senha:</label>
            <input type="password" id="passwordConfirm" />
          </div>

          <Button
            size="lg"
            typeUIButton="default"
            text="Criar conta"
            type="submit"
          />

          <Link to="/">Voltar para Home</Link>
        </form>
      </section>
    </Container>
  );
};
