import styled from "styled-components";

export const Container = styled.div`
  position: relative;

  display: flex;
  align-items: center;
  gap: 13px;

  img.imgProfile {
    width: 54px;
  }

  .menu {
    display: flex;
    gap: 10px;
    cursor: pointer;
  }

  img.menuIcon {
    width: 14px !important;
    cursor: pointer;
  }

  ul.dropdown-links {
    z-index: 1;

    position: absolute;
    right: 0;
    top: 100%;

    display: flex;
    flex-direction: column;
    justify-content: center;

    height: 65px;
    width: 100px;

    background: var(--white);
    list-style: none;
    border-radius: 3px;

    font-style: normal;
    font-weight: 600;
    font-size: 14px;

    li {
      padding: 0;
      line-height: 1;

      &:hover {
        background: var(--gray);
      }

      a {
        display: flex;
        padding: 6px 16px;
      }
    }

    .quit {
      color: var(--red);
    }
  }
`;
