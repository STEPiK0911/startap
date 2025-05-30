import Block from "@shared/components/Block/Block";
import YMap from "@shared/components/Map/Map";

interface MapWithPointProps {
    isFull: boolean;
    onSelectPoint: (id: string) => void;
    selectedPointId: string; // 👈 добавили
}

const MapWithPoint = ({ isFull, onSelectPoint, selectedPointId }: MapWithPointProps) => {
    return (
        <div style={{ height: 550, marginTop: 60, display: "flex", gap: 50 }}>
            <Block pointId={selectedPointId} /> {/* ✅ теперь работает */}

            <YMap expanded={isFull} onPointClick={onSelectPoint} />
        </div>
    );
};

export default MapWithPoint;
