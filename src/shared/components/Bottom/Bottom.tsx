import React from "react";
import { Link } from "react-router-dom";
import styles from "./Bottom.module.css";
import logo from "../../../../public/logo.svg";
const Bottom = () => {
  return (
    <div className={styles.navBar}>
      <div className={styles.logo}>
        <Link to="/">
          <img src={logo} />
        </Link>
      </div>
      <div className={styles.navigations}>
        <Link to="https://ru.wikipedia.org/wiki/Чёрный_нал">FAQ</Link>
        <Link to="https://doedemklassno.ru/uploads/s/o/s/r/osrp7wo6mea9/img/full_YA1Odmtb.png">
          Политика конфиденциальности
        </Link>
        <Link to="https://www.rusprofile.ru/id/1248600003046">
          ООО "Тимур и его команда"
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

export default Bottom;
