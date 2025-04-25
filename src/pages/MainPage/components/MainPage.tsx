import ContentPageWrapper from "@widgets/ContentPageWrapper/ContentPageWrapper";
import styles from "./MainPage.module.css";
import NavBar from "@shared/components/NavBar/NavBar";

const MainPage = () => {
  return (
    <div className={styles.pageWrapper}>
      <NavBar />
      <ContentPageWrapper />
    </div>
  );
};

export default MainPage;
