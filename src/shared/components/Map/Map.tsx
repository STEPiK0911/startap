import React, { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import './YMap.module.css';
import {points} from "@shared/components/Block/points";


// Точки с координатами, названиями и адресами


// Кастомная иконка
const svgIcon = new L.DivIcon({
    html: `
    <div style="
      background-color: #ff5722;
      width: 24px;
      height: 24px;
      border-radius: 50%;
      border: 2px solid white;
      box-shadow: 0 0 5px rgba(0,0,0,0.4);
    "></div>
  `,
    iconSize: [24, 24],
    className: ''
});

// Центрирование карты при расширении
const FitMap = ({ expanded }: { expanded: boolean }) => {
    const map = useMap();
    useEffect(() => {
        if (expanded) {
            const bounds = L.latLngBounds(points.map(p => p.coords as [number, number]));
            map.fitBounds(bounds, { padding: [50, 50] });
        }
    }, [expanded]);
    return null;
};

const YMap = ({
                  expanded,
                  onPointClick,
              }: {
    expanded: boolean;
    onPointClick?: (id: string) => void;
}) => {
    return (
        <div style={{ width: '100%', height: '500px' }}>
            <MapContainer center={[55.75, 37.57]} zoom={10} style={{ height: '100%', width: '100%' }} attributionControl={false}>
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; OpenStreetMap contributors'
                />
                <FitMap expanded={expanded} />
                {points.map(point => (
                    <Marker
                        key={point.id}
                        position={point.coords as [number, number]}
                        icon={svgIcon}
                        eventHandlers={{
                            click: () => onPointClick?.(point.id),
                        }}
                    >
                        <Popup minWidth={250}>
                            <div style={{ fontFamily: "sans-serif" }}>
                                <img
                                    src={point.image}
                                    alt={point.title}
                                    style={{
                                        width: "100%",
                                        height: 120,
                                        objectFit: "cover",
                                        borderRadius: 8,
                                        marginBottom: 8,
                                    }}
                                />
                                <div style={{ fontWeight: 'bold', marginBottom: 4 }}>{point.title}</div>
                                <div style={{ fontSize: '14px', color: '#555', marginBottom: 6 }}>{point.address}</div>
                                <div style={{ fontSize: '14px', marginBottom: 4 }}>
                                    <strong>Тип:</strong> {point.type}
                                </div>
                                <div style={{ fontSize: '14px', marginBottom: 4 }}>
                                    <strong>Рейтинг:</strong> {point.rating} ⭐
                                </div>
                                <div style={{ fontSize: '13px', color: '#444' }}>{point.description}</div>
                            </div>
                        </Popup>

                    </Marker>
                ))}
            </MapContainer>
        </div>
    );
};

export default YMap;
