import React, { useEffect, useState } from "react";
import { points } from "./points";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { useFavorites } from "../../../pages/FavoritesPage/components/FavoritesContext";

const Block = ({ pointId }: { pointId: string }) => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [rating, setRating] = useState<number | null>(null);

    const { favorites, toggleFavorite } = useFavorites();

    useEffect(() => {
        const point = points.find((p) => p.id === pointId);
        if (point) {
            setTitle(point.title);
            setDescription(point.description || "");
            setRating(point.rating || null);
        }
    }, [pointId]);

    const isFavorite = favorites.some((p) => p.id === pointId);

    return (
        <div style={{ height: 500, width: 500, backgroundColor: "white", padding: 20, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
                <div style={{ fontWeight: "bold", fontSize: 18 }}>{title}</div>
                {rating !== null && (
                    <div style={{ fontSize: 16, color: "#444" }}>
                        ⭐ {rating}
                    </div>
                )}
            </div>

            <div style={{ flexGrow: 1, display: "flex", alignItems: "center", justifyContent: "center", textAlign: "center" }}>
                <div style={{ fontSize: 15, color: "#555", maxWidth: "90%" }}>
                    {description}
                </div>
            </div>

            <div style={{ display: "flex", justifyContent: "center", marginTop: 20 }}>
                <button onClick={() => toggleFavorite(pointId)} style={{ background: "none", border: "none", cursor: "pointer" }}>
                    {isFavorite ? (
                        <AiFillHeart size={64} color="red" />
                    ) : (
                        <AiOutlineHeart size={64} color="#999" />
                    )}
                </button>
            </div>
        </div>
    );
};

export default Block;
