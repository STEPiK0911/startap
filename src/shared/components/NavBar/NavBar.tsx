import React from "react";
import { Link } from "react-router-dom";
import styles from "./NavBar.module.css";
import logo from "../../../../public/logo.svg";
const NavBar = () => {
  return (
    <div className={styles.navBar}>
      <div className={styles.logo}>
        <Link to="/">
          <img src={logo} />
        </Link>
      </div>
      <div className={styles.navigations}>
        <Link to="/fav">Избранное</Link>
        <Link to="/lk">Личный кабинет</Link>
        <Link to="/auth">Авторизация</Link>
      </div>
    </div>
  );
};

export default NavBar;
