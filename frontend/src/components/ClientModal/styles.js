import styled, { css } from "styled-components";

export const Background = styled.div`
  background: rgba(0, 0, 0, 0.7);
  min-height: 100vh;
  width: 100%;

  z-index: 2;

  position: absolute;
  top: 0;
  left: 0;

  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Container = styled.form`
  width: 100%;
  max-width: 376px;

  display: flex;
  flex-direction: column;

  border: 2px solid;
  border-color: ${({ theme }) =>
    theme === "default"
      ? css`var(--primary)`
      : theme === "edit"
      ? css`var(--green-dark)`
      : css`var(--warning-dark)`};

  border-radius: 3px;
  overflow: hidden;

  .form-header {
    position: relative;

    height: 50px;
    padding: 0 16px;

    display: flex;
    align-items: center;

    background: ${({ theme }) =>
      theme === "default"
        ? css`var(--primary)`
        : theme === "edit"
        ? css`var(--green)`
        : css`var(--warning)`};

    h2 {
      color: var(--white);
      font-style: normal;
      font-weight: 700;
      font-size: 20px;
      line-height: 48px;
    }

    svg {
      position: absolute;
      top: 10px;
      right: 10px;

      color: #fff;
      font-size: 20px;
      cursor: pointer;
      transition: color 0.2s ease;

      &:hover {
        color: var(--primary-dark);
      }
    }
  }

  .form-body {
    padding: 21px 16px;

    display: flex;
    flex-direction: column;

    background: var(--white);

    .form-group {
      display: flex;
      flex-direction: column;
      gap: 5px;
      margin-bottom: 5px;

      div {
        display: flex;

        justify-content: space-between;
        line-height: 1.8;
      }

      span.error {
        font-size: 12px;
        font-weight: 600;
        color: var(--red);
      }
    }

    .form-group:not(:last-child) {
      margin-bottom: 15px;
    }

    label {
      color: ${({ theme }) =>
        theme === "default"
          ? css`var(--primary)`
          : theme === "edit"
          ? css`var(--green)`
          : css`var(--warning-dark)`};

      font-style: normal;
      font-weight: 500;
      font-size: 16px;
      line-height: 19px;

      &[htmlFor="isAlreadyExists"] {
        color: red !important;
      }

      &.alreadyExistsLoan {
        display: flex;
        align-items: center;
        gap: 12px;
        /* background: red; */
        height: 22px;
      }
    }

    input {
      height: 42px;
      padding: 0 16px;

      background: var(--white);
      border: 2px solid;
      border-color: ${({ theme }) =>
        theme === "default"
          ? css`var(--primary)`
          : theme === "edit"
          ? css`var(--green)`
          : css`var(--warning-dark)`};
      border-radius: 5px;

      color: var(--gray-dark);
      font-weight: 500;
      font-size: 16px;
      letter-spacing: 0.3px;

      &::placeholder {
        font-weight: 300;
        color: var(--gray-medium);
      }

      &:disabled {
        opacity: 0.5;
        cursor: not-allowed;
      }
    }
  }

  .form-footer {
    height: 52px;
    padding: 0 16px;

    display: flex;
    align-items: center;
    justify-content: flex-end;
    gap: 14px;
    background: var(--gray-light);

    button {
      width: 96px;
      height: 30px;

      border-radius: 3px;

      font-style: normal;
      font-weight: 600;
      font-size: 13px;
      cursor: pointer;

      transition: background 0.2s ease;

      &.cancel {
        color: var(--gray-dark);
        background: var(--gray);
        border: 1px solid #bbb;

        &:hover {
          background: var(--gray-light);
        }
      }

      &.confirm {
        color: var(--white);

        background: ${({ theme }) =>
          theme === "default"
            ? css`var(--primary)`
            : theme === "edit"
            ? css`var(--green)`
            : css`var(--warning)`};

        border: 1px solid;
        border-color: ${({ theme }) =>
          theme === "default"
            ? css`var(--primary)`
            : theme === "edit"
            ? css`var(--green-dark)`
            : css`var(--warning-dark)`};

        &:hover {
          background: ${({ theme }) =>
            theme === "default"
              ? css`var(--primary-dark)`
              : theme === "edit"
              ? css`var(--green-dark)`
              : css`var(--warning-dark)`};
        }
      }
    }
  }
`;
