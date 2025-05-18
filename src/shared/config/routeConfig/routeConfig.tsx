import { RouteProps } from "react-router-dom";
import MainPage from "@pages/MainPage/components/MainPage";
import { AuthorizationPage } from "@pages/AuthorizationPage";
import LichiniKabinet from "@pages/LichiniKabinet/components/LichiniKabinet";
import FavoritesPage from "@pages/FavoritesPage/components/FavoritesPage";

export enum AppRoutes {
  MAIN = "main",
  AUTH = "auth",
  LK = "lk",
  FAV = "fav",
}

export const RoutePath: Record<AppRoutes, string> = {
  [AppRoutes.MAIN]: "/",
  [AppRoutes.AUTH]: "/auth",
  [AppRoutes.LK]: "/lk",
  [AppRoutes.FAV]: "/fav",
};

export const routeConfig: Record<AppRoutes, RouteProps> = {
  [AppRoutes.MAIN]: {
    path: RoutePath.main,
    element: <MainPage />,
  },
  [AppRoutes.AUTH]: {
    path: RoutePath.auth,
    element: <AuthorizationPage />,
  },
  [AppRoutes.LK]: {
    path: RoutePath.lk,
    element: <LichiniKabinet />,
  },
  [AppRoutes.FAV]: {
    path: RoutePath.fav,
    element: <FavoritesPage />,
  },
};
