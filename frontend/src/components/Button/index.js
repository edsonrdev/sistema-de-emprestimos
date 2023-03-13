import { Container } from "./styles";

export const Button = ({ text, typeUIButton, ...rest }) => (
  <Container typeUIButton={typeUIButton} {...rest}>
    {text}
  </Container>
);
