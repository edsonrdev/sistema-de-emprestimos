import styled from "styled-components";

export const Container = styled.div`
  min-height: 100vh;
  background: var(--secondary-dark);
  accent-color: var(--primary);

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
    h2 {
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

    .page-title {
      display: flex;
      justify-content: space-between;
      align-items: center;

      .show-disabled {
        display: flex;
        align-items: center;
        gap: 10px;

        color: var(--gray);
        font-style: normal;
        font-weight: 300;
        font-size: 16px;
        line-height: 48px;

        #show-disabled {
          width: 20px;
          height: 20px;
          -webkit-appearance: none;
          appearance: none;
          border: 0.15em solid var(--gray-light);
          border-radius: 0.25em;
          transform: translateY(-0.075em);
          /* background: transparent !important; */

          display: grid;
          place-content: center;

          &::before {
            content: "";
            width: 12px;
            height: 12px;
            transform: scale(0);
            border-radius: 0.15em;
            transition: 120ms transform ease-in-out;
            box-shadow: inset 1em 1em var(--primary-light);
            transition: transform 0.3s ease;
            background-color: CanvasText;
            transform-origin: bottom left;
            clip-path: polygon(
              14% 44%,
              0 65%,
              50% 100%,
              100% 16%,
              80% 0%,
              43% 62%
            );
          }

          &:checked::before {
            transform: scale(1);
          }
        }
      }
    }

    .search-new-customers {
      display: flex;
      justify-content: space-between;
      gap: 20px;
      margin-bottom: 26px;

      input {
        height: 44px;
        width: 300px;
        padding: 16px;

        border: 2px solid var(--primary-light);
        border-radius: 5px;

        color: var(--gray-medium);
        font-style: normal;
        font-weight: 400;
        font-size: 16px;
        line-height: 48px;
      }

      .search-customers {
        display: flex;

        input {
          /* border-radius: 5px 0 0 5px; */
          /* border-right: none; */
          outline: none;
        }

        button {
          border-radius: 0 5px 5px 0;
          border-left: none;
          outline: none;
        }
      }
    }

    table.customers-table {
      border-radius: 5px;
      background: rgba(255, 255, 255, 0.1);
      text-align: center;
      vertical-align: middle;
      border-radius: 5px;
      overflow: hidden;
      border-spacing: 0;

      display: table;
      width: 100%;
      border: 2px solid var(--primary) !important;

      thead {
        height: 50px;
        background: var(--primary);

        th {
          text-align: left;
          padding: 16px;
          color: var(--white);
          font-style: normal;
          font-weight: 600;
          font-size: 20px;
          text-align: left;
        }
      }

      tbody {
        border-collapse: collapse;

        td {
          padding: 16px;
          border-bottom: 1px solid #606060;

          color: var(--white);
          font-style: normal;
          font-weight: 300;
          font-size: 16px;
          text-align: left;

          a {
            color: var(--blue-light);
            border-bottom: 1px solid;
          }
        }

        p {
          font-size: 20px;
        }

        .options {
          display: flex;
          gap: 20px;

          img {
            cursor: pointer;
          }
        }
      }
    }
  }
`;
