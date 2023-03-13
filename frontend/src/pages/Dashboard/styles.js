import styled from "styled-components";

export const Container = styled.div`
  min-height: 100vh;
  background: var(--secondary-dark);

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

    .summary {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      gap: 24px;

      margin-bottom: 50px;

      .card {
        position: relative;

        flex: 0 0 calc((100% - 24px) / 2);
        height: 160px;
        padding: 24px;
        cursor: pointer;
        transition: background 0.2s ease;

        border-radius: 8px;

        &:nth-of-type(1) {
          background: var(--primary-light);
          &:hover {
            background: var(--primary);
          }
        }
        &:nth-of-type(2) {
          background: var(--green);
          &:hover {
            background: var(--green-dark);
          }
        }
        &:nth-of-type(3) {
          background: var(--blue);
          &:hover {
            background: var(--blue-dark);
          }
        }
        &:nth-of-type(4) {
          background: var(--red);
          &:hover {
            background: var(--red-dark);
          }
        }

        color: var(--white);

        .title {
          font-style: normal;
          font-weight: 400;
          font-size: 16px;
          text-shadow: 2px 2px 0px rgba(0, 0, 0, 0.2);
        }

        img {
          position: absolute;
          top: 24px;
          right: 26px;

          text-shadow: 3px 3px 4px rgba(0, 0, 0, 0.2);
        }

        .price {
          position: absolute;

          left: 24px;
          bottom: 18px;

          font-style: normal;
          font-weight: 700;
          font-size: 40px;
          line-height: 48px;
          text-shadow: 2px 2px 0px rgba(0, 0, 0, 0.2);
        }
      }
    }
  }
`;
