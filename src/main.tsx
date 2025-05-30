import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "@app/App";
import { FavoritesProvider } from "./pages/FavoritesPage/components/FavoritesContext"; // путь подгони под свой проект

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <BrowserRouter>
            <FavoritesProvider>
                <App />
            </FavoritesProvider>
        </BrowserRouter>
    </StrictMode>
);
