import React from "react";
import styles from "./AuthorizationPage.module.css";
import AuthorizationPageWrapper from "@widgets/AuthorizationPageWrapper/AuthorizationPageWrapper";

const AuthorizationPage = () => {
  return (
    <div className={styles.pageWrapper}>
      <AuthorizationPageWrapper />
    </div>
  );
};

export default AuthorizationPage;
