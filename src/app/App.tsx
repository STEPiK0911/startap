import "@app/styles/index.scss";
import { YMaps } from "@pbe/react-yandex-maps";
import AppRouter from "@app/provider/router/ui/AppRouter";
import NavBar from "@shared/components/NavBar/NavBar";
import Bottom from "@shared/components/Bottom/Bottom";

function App() {
  return (
    <>
      <YMaps>
        <div className="app">
          <NavBar />
          <AppRouter />
          <Bottom />
        </div>
      </YMaps>
    </>
  );
}

export default App;
