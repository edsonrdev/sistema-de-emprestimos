import { useRef, useState } from "react";
import { Container } from "./styles";

import ProfileImg from "../../assets/profile.png";
import MenuIcon from "../../assets/MenuIcon.svg";
import { Link } from "react-router-dom";

export const Profile = () => {
  const [isOpenMenu, setIsOpenMenu] = useState(false);
  const menu = useRef(null);

  const handleOpenMenu = (e) => {
    if (e.target === menu) {
      console.log("deu match!");
    }
    setIsOpenMenu(!isOpenMenu);
  };

  return (
    <Container onClick={(e) => handleOpenMenu(e)}>
      <img src={ProfileImg} className="imgProfile" alt="Foto do Perfil" />
      <div className="menu" onClick={(e) => handleOpenMenu(e)} ref={menu}>
        <span className="username">Erick N.</span>
        <img src={MenuIcon} className="menuIcon" alt="Ícone" />
      </div>

      {isOpenMenu && (
        <ul className="dropdown-links">
          <li>
            <Link to="/account">Conta</Link>
          </li>
          <li>
            <Link to="/exit" className="quit">
              Sair
            </Link>
          </li>
        </ul>
      )}
    </Container>
  );
};
