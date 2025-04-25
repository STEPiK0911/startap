import "@app/styles/index.scss";
import MainPage from "@pages/MainPage/components/MainPage";
import { YMaps } from "@pbe/react-yandex-maps";

function App() {
  return (
    <>
      <YMaps>
        <div className="app">
          <MainPage />
        </div>
      </YMaps>
    </>
  );
}

export default App;
