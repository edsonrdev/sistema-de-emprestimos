import styled from "styled-components";

export const Container = styled.div`
  min-height: 100vh;
  background: var(--secondary-dark) 50%;
  color: var(--white);

  header {
    background: var(--primary);

    color: var(--white);
    font-style: normal;
    font-weight: 600;
    font-size: 20px;
    line-height: 48px;

    .container {
      height: 75px;

      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    ul.links {
      display: inline-flex;
      gap: 54px;

      list-style: none;

      a {
        color: var(--gray-light);

        &.active {
          color: var(--white);
        }
      }
    }
  }

  main {
    .page-title {
      display: flex;
      justify-content: space-between;
      align-items: center;

      > h2 {
        margin-top: 20px;
        margin-bottom: 26px;
        padding-left: 16px;

        color: var(--gray);
        font-style: normal;
        font-weight: 600;
        font-size: 24px;
        line-height: 44px;

        border-left: 7px solid var(--primary);
      }

      .show-disabled {
        display: flex;
        gap: 10px;

        color: var(--gray);
        font-style: normal;
        font-weight: 600;
        font-size: 14px;
        line-height: 48px;
      }
    }

    .hire-loan {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      gap: 24px;
    }

    .loan-input-values {
      display: flex;
      align-items: center;
      justify-content: space-between;

      > div {
        display: flex;

        button {
          border-radius: 0 5px 5px 0;
          border-left-color: transparent;
        }

        input {
          min-width: 226px;
          padding: 0 12px;

          outline: 0;
          border-radius: 5px 0 0 5px;
          border: 1px solid var(--gray-medium);
          border-right-color: transparent;
        }
      }

      h3 {
        display: flex;
        align-items: center;
        gap: 10px;

        font-family: "Inter";
        font-style: normal;
        font-weight: 400;
        font-size: 16px;
        line-height: 48px;

        span {
          font-size: 18px;
          color: var(--red);
          font-weight: 600;
        }
      }
    }
  }
`;
