import React from "react";
import styles from "./AuthorizationPage.module.css";
import AuthorizationPageWrapper from "@widgets/AuthorizationPageWrapper/AuthorizationPageWrapper";

export const AuthorizationPage = () => {
  return (
    <div className={styles.pageWrapper}>
      <AuthorizationPageWrapper />
    </div>
  );
};

