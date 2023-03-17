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
      margin-bottom: 16px;

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

    .data-loan {
      display: flex;
      gap: 16px;
      justify-content: flex-end;

      table {
        flex: 1;
        align-self: flex-start;
        color: var(--gray-dark);
        /* width: 100%; */
        background: #eee;
        border-radius: 5px;
        border-spacing: 0;
        overflow: hidden;

        thead {
          height: 52px !important;
          background: var(--primary);

          th {
            color: var(--white);
            padding: 10px;
            font-size: 18px;
            text-align: left;
            border-right: 1px solid rgba(255, 255, 255, 0.25);
          }
        }

        tbody {
          td {
            font-size: 14px;
            padding: 10px;
            border-right: 1px solid rgba(0, 0, 0, 0.1);
            border-bottom: 1px solid rgba(0, 0, 0, 0.1);
          }

          td.input {
            font-weight: 600;
            color: var(--green);
          }
          td.output {
            font-weight: 600;
            color: var(--red);
          }
        }
      }

      aside {
        flex-basis: 360px;
        align-self: flex-start;

        display: flex;
        flex-direction: column;
        gap: 16px;

        .form-change-total {
          display: flex;
          flex-direction: column;
          /* overflow: hidden; */
          border-radius: 5px;
          border: 2px solid var(--gray-dark);

          input {
            height: 50px;
            min-width: 100px;
            padding: 0 12px;

            outline: 0;
            border-radius: 3px 3px 0 0;
            border: 0;

            font-size: 15px;

            ::placeholder {
              font-size: 15px;
            }
          }

          .buttons {
            display: flex;

            button {
              flex: 1;
              border-radius: 0;
              border: 0 !important;
            }

            button:nth-of-type(1) {
              /* border-left-color: transparent; */
              border-radius: 0 0 0 3px;
              background: var(--green);
              border: 2px solid var(--green-dark);

              &:hover {
                background: var(--green-dark);
              }
            }
            button:nth-of-type(2) {
              border-radius: 0 0 3px 0;
              background: var(--red);
              border: 2px solid var(--red-dark);

              &:hover {
                background: var(--red-dark);
              }
            }
          }
        }

        .current-loan-data {
          overflow: hidden;
          border-radius: 5px;
          border: 2px solid var(--primary);

          header {
            height: 50px;
            padding: 0 16px;
          }

          ul {
            display: flex;
            flex-direction: column;
            padding: 16px;
            gap: 12px;

            color: var(--gray-dark);
            background: #eee;

            li {
              display: flex;
              justify-content: space-between;

              &:last-of-type .data-value {
                font-weight: 700;
                color: var(--red);
              }
            }

            span {
              font-size: 15px;

              &.data-title {
                font-weight: 700;
              }
            }
          }
        }
      }
    }
  }
`;
