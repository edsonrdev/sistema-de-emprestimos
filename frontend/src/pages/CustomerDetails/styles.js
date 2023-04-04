import styled from "styled-components";

export const Container = styled.div`
  min-height: 100vh;
  background: var(--secondary-dark);
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
      margin: 20px 0;
      /* background-color: red; */

      h2:nth-of-type(1) {
        padding-left: 16px;

        color: var(--gray);
        font-style: normal;
        font-weight: 600;
        font-size: 24px;
        line-height: 44px;

        border-left: 7px solid var(--primary);
      }

      h2:nth-of-type(2) {
        display: flex;
        align-items: center;
        gap: 10px;
        /* background-color: red; */

        span {
          font-size: 18px;
          color: var(--red);
          font-weight: 600;
        }
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

    hr {
      margin-bottom: 20px;
      border: 1px solid #555;
    }

    .hire-loan {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      gap: 24px;

      .loan-buttons {
        display: flex;
        align-items: center;
        gap: 16px;
      }
    }

    .loan-input-values {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 16px;
    }

    .data-loan {
      display: flex;
      flex-direction: column;
      gap: 16px;
      /* justify-content: flex-end; */
      /* background: red; */

      hr {
        margin: 0;
      }

      table {
        flex: 1 1 auto;
        /* order: 2; */
        color: var(--gray-dark);
        /* width: 100%; */
        background: #eee;
        border-radius: 5px;
        border-spacing: 0;
        overflow: hidden;
        border: 2px solid var(--primary);

        thead {
          height: 52px !important;
          background: var(--primary);

          th {
            color: var(--white);
            padding: 10px;
            font-size: 17px;
            font-weight: 700;
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

      .loan-panel {
        /* flex-basis: 360px;
        align-self: flex-start; */

        display: flex;
        align-items: flex-start;
        /* flex-direction: column; */
        gap: 16px;

        form {
          display: flex;
          flex: 1;
          flex-direction: column;
          /* overflow: hidden; */
          border-radius: 5px;
          /* padding: 16px; */
          border: 2px solid var(--primary);
          /* background: var(--primary-dark); */

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
          flex: 1;
          overflow: hidden;
          border-radius: 5px;
          border: 2px solid var(--primary);

          header {
            height: 50px;
            padding: 0 16px;
            font-size: 17px;
            font-weight: 700;
          }

          ul {
            display: flex;
            flex-direction: column;
            padding: 16px;
            gap: 12px;

            color: var(--gray-dark);
            background: #eee;

            li {
              font-size: 14px;
              display: flex;
              justify-content: space-between;

              &:last-of-type {
                font-size: 20px;
                color: var(--primary-light);
              }
            }

            span.data-title {
              font-weight: 700;
            }
          }
        }

        .forms {
          flex: 0 0 420px;
          display: flex;
          flex-direction: column;
          gap: 16px;
        }
      }
    }
  }
`;
