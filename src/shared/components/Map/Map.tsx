import React, { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import './YMap.module.css';

// Точки с координатами, названиями и адресами
const points = [
    {
        id: 'kremlin',
        coords: [55.752023, 37.617499],
        title: 'Московский Кремль',
        address: 'Красная площадь, Москва',
    },
    {
        id: 'vdnh',
        coords: [55.829998, 37.633305],
        title: 'ВДНХ',
        address: 'Проспект Мира, 119, Москва',
    },
    {
        id: 'msu',
        coords: [55.703118, 37.530887],
        title: 'МГУ им. Ломоносова',
        address: 'Ленинские Горы, 1, Москва',
    },
    {
        id: 'ostankino',
        coords: [55.819543, 37.611619],
        title: 'Останкинская башня',
        address: 'ул. Академика Королёва, 15, Москва',
    },
    {
        id: 'zaryadye',
        coords: [55.751739, 37.630802],
        title: 'Парк Зарядье',
        address: 'ул. Варварка, 6, стр. 1, Москва',
    },
];

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
                        <Popup>
                            <div>
                                <div style={{ fontWeight: 'bold', marginBottom: 4 }}>{point.title}</div>
                                <div style={{ fontSize: '14px', color: '#555' }}>{point.address}</div>
                            </div>
                        </Popup>
                    </Marker>
                ))}
            </MapContainer>
        </div>
    );
};

export default YMap;
