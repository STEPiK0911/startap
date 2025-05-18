import { RouteProps } from "react-router-dom";
import MainPage from "@pages/MainPage/components/MainPage";
import AuthorizationPage from "@pages/AuthorizationPage/components/AuthorizationPage";

export enum AppRoutes {
  MAIN = "main",
  AUTH = "auth",
}

export const RoutePath: Record<AppRoutes, string> = {
  [AppRoutes.MAIN]: "/",
  [AppRoutes.AUTH]: "/auth",
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
};
