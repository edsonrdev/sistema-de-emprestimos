import styled from "styled-components";

export const Container = styled.div`
  min-height: 100vh;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 44px;

  background-image: linear-gradient(
    to right,
    var(--primary) 50%,
    var(--secondary-dark) 50%
  );

  color: var(--white);

  h1 {
    font-weight: 700;
    font-size: 54px;
    line-height: 65px;
  }

  p {
    max-width: 570px;

    font-weight: 300;
    font-size: 24px;
    line-height: 40px;
    letter-spacing: 1%;
    text-align: center;
  }

  div {
    display: flex;
    justify-content: center;
    gap: 28px;
  }

  a {
    /* flex: 1 0 155px; */
    height: 50px;

    display: flex;
    justify-content: center;
    align-items: center;

    border-radius: 5px;
    background: red;

    color: var(--white);
    font-weight: 600;
    font-size: 20px;
    line-height: 48px;

    background: var(--primary);
    border: 2px solid var(--primary-light);
    transition: background 0.2s ease;

    &:hover {
      background: var(--primary-dark);
    }

    &:first-of-type {
      background: var(--secondary);
      border-color: var(--gray-dark);

      &:hover {
        background: var(--secondary-dark);
      }
    }
  }
`;
