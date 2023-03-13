import styled from "styled-components";

export const Container = styled.header`
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
`;
