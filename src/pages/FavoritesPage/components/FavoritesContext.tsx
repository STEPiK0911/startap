// FavoritesContext.tsx
import React, { createContext, useContext, useState, ReactNode } from "react";
import { points } from "../../../shared/components/Block/points"; // путь подгони под проект

export type Place = {
    id: string;
    title: string;
    description: string;
    image: string;
    rating: number;
    category: string;
    location: string;
};

type FavoritesContextType = {
    favorites: Place[];
    toggleFavorite: (pointId: string) => void;
    isFavorite: (pointId: string) => boolean;
};

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

export const useFavorites = (): FavoritesContextType => {
    const context = useContext(FavoritesContext);
    if (!context) {
        throw new Error("useFavorites must be used within a FavoritesProvider");
    }
    return context;
};

export const FavoritesProvider = ({ children }: { children: ReactNode }) => {
    const [favorites, setFavorites] = useState<Place[]>([]);

    const toggleFavorite = (pointId: string) => {
        setFavorites((prev) => {
            const exists = prev.find((f) => f.id === pointId);
            if (exists) {
                return prev.filter((f) => f.id !== pointId);
            } else {
                const point = points.find((p) => p.id === pointId);
                return point ? [...prev, point] : prev;
            }
        });
    };

    const isFavorite = (pointId: string) => favorites.some((f) => f.id === pointId);

    return (
        <FavoritesContext.Provider value={{ favorites, toggleFavorite, isFavorite }}>
            {children}
        </FavoritesContext.Provider>
    );
};
