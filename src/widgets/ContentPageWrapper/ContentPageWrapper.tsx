import React, { useRef, useState, useEffect } from "react";
import MapWithPoint from "@shared/components/MapWithPoint/MapWithPoint";
import Search from "@shared/components/Search/Search";
import SaleGraphics from "@shared/components/SaleGraphics/SaleGraphics";
import InviteGraphics from "@shared/components/InviteGraphics/InviteGraphics";
import style from './Page.module.css'

const ContentPageWrapper = () => {
    const [isMapFull, setIsMapFull] = useState(false);
    const [isMouseOverMap, setIsMouseOverMap] = useState(false);
    const [isSearchFocused, setIsSearchFocused] = useState(false);

    const [selectedPointId, setSelectedPointId] = useState("kremlin"); // 👈 добавили

    useEffect(() => {
        if (!isSearchFocused && !isMouseOverMap) {
            const timeout = setTimeout(() => setIsMapFull(false), 300);
            return () => clearTimeout(timeout);
        }
    }, [isSearchFocused, isMouseOverMap]);

    return (
        <>
            <Search
                onFocus={() => {
                    setIsSearchFocused(true);
                    setIsMapFull(true);
                }}
                onBlur={() => setIsSearchFocused(false)}
            />

            <div
                onMouseEnter={() => setIsMouseOverMap(true)}
                onMouseLeave={() => setIsMouseOverMap(false)}
            >
                {/* 👇 пробрасываем обработчик вниз */}
                <MapWithPoint
                    isFull={isMapFull}
                    onSelectPoint={setSelectedPointId}
                    selectedPointId={selectedPointId}
                />

            </div>

            <div className={style.dive}>
                <SaleGraphics pointId={selectedPointId} />
                {/* 👇 передаём выбранную точку */}
                <InviteGraphics pointId={selectedPointId} />
            </div>
        </>
    );
};


export default ContentPageWrapper;
