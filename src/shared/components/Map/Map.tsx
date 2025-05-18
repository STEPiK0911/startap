import React, { useEffect, useRef } from "react";
import { Map } from "@pbe/react-yandex-maps";
import styles from "./YMap.module.css";

const YMap = ({ expanded }: { expanded: boolean }) => {
    const mapRef = useRef<any>(null);

    useEffect(() => {
        if (expanded && mapRef.current) {
            // Принудительно обновляем размер карты
            setTimeout(() => {
                mapRef.current.container.fitToViewport();
            }, 300); // дождаться завершения transition
        }
    }, [expanded]);

    return (
        <div className={`
    ${styles.mapContainer}
    ${expanded ? styles.expanded : styles.collapsed}
  `}>
            <Map
                defaultState={{ center: [55.75, 37.57], zoom: 9 }}
                instanceRef={mapRef}
                width="100%"
                height="100%"
            />
        </div>
    );
};

export default YMap;
