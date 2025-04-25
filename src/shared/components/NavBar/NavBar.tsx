import React from "react";
import styles from "./NavBar.module.css";
const NavBar = () => {
  return (
    <div className={styles.navBar}>
      <div className={styles.logo}>logo</div>
      <div className={styles.navigations}>
        <div>Избранное</div>
        <div>Личный кабинет</div>
      </div>
    </div>
  );
};

export default NavBar;
