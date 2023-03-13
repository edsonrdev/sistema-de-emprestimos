import styled from "styled-components";

export const Container = styled.div`
  min-height: 100vh;

  display: flex;

  background-image: linear-gradient(
    to right,
    var(--primary) 50%,
    var(--secondary-dark) 50%
  );

  color: var(--white);

  > section {
    flex: 1;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  h1 {
    font-weight: 700;
    font-size: 54px;
    line-height: 65px;
    margin-bottom: 44px;
  }

  p {
    max-width: 532px;

    font-weight: 300;
    font-size: 24px;
    line-height: 40px;
    letter-spacing: 1%;
    text-align: center;
  }

  form {
    width: 100%;
    max-width: 360px;

    display: flex;
    flex-direction: column;
    gap: 18px;
    /* background-color: red; */

    div.form-group {
      display: flex;
      flex-direction: column;
    }

    label {
      color: var(--gray);
      font-weight: 400;
      font-size: 20px;
      line-height: 24px;
      margin-bottom: 8px;
    }

    input {
      height: 50px;
      padding: 16px;
      border: 2px solid var(--primary-light);
      border-radius: 5px;
    }

    a {
      color: var(--primary-light);
      text-align: center;
    }
  }

  /* button {
    flex: 1 0 155px;
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
    } */
  /* } */
`;
