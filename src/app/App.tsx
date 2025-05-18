import "@app/styles/index.scss";
import AuthorizationPage from "@pages/AuthorizationPage/components/AuthorizationPage";
import MainPage from "@pages/MainPage/components/MainPage";
import { YMaps } from "@pbe/react-yandex-maps";

function App() {
  return (
    <>
      <YMaps>
        <div className="app">
          <AuthorizationPage />
        </div>
      </YMaps>
    </>
  );
}

export default App;
