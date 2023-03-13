import styled, { css } from "styled-components";

export const Container = styled.button`
  border: 2px solid;

  padding: 0 16px;

  height: ${({ size }) =>
    size === "lg"
      ? "50px"
      : size === "md"
      ? "44px"
      : size === "sm"
      ? "36px"
      : "44px"};

  min-width: ${({ size }) =>
    size === "lg"
      ? "200px"
      : size === "md"
      ? "176px"
      : size === "sm"
      ? "144px"
      : "176px"};

  display: flex;
  align-items: center;
  justify-content: center;

  /* background: var(--primary); */

  background: ${({ typeUIButton }) =>
    typeUIButton === "default"
      ? css`var(--primary)`
      : typeUIButton === "edit"
      ? css`var(--green)`
      : typeUIButton === "disable"
      ? css`var(--warning)`
      : typeUIButton === "dark"
      ? css`var(--secondary)`
      : css`var(--gray-text)`};

  border-radius: 5px;
  border: 2px solid;
  border-color: ${({ typeUIButton }) =>
    typeUIButton === "default"
      ? css`var(--primary-dark)`
      : typeUIButton === "edit"
      ? css`var(--green-dark)`
      : typeUIButton === "disable"
      ? css`var(--warning-dark)`
      : typeUIButton === "dark"
      ? css`var(--secondary-dark)`
      : css`var(--gray-dark)`};

  transition: background 0.2s ease;
  cursor: pointer;

  color: var(--white);
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 48px;

  font-size: ${({ size }) =>
    size === "lg"
      ? "20px"
      : size === "md"
      ? "16px"
      : size === "sm"
      ? "13px"
      : "16px"};

  letter-spacing: ${({ size }) =>
    size === "lg"
      ? "1px"
      : size === "md"
      ? "0.8px"
      : size === "sm"
      ? "0.5px"
      : "0.8px"};

  &:hover {
    background: ${({ typeUIButton }) =>
      typeUIButton === "default"
        ? css`var(--primary-dark)`
        : typeUIButton === "edit"
        ? css`var(--green-dark)`
        : typeUIButton === "disable"
        ? css`var(--warning-dark)`
        : typeUIButton === "dark"
        ? css`var(--secondary-dark)`
        : css`var(--gray-dark)`};
  }
`;
