import Block from "@shared/components/Block/Block";
import YMap from "@shared/components/Map/Map";

interface MapWithPointProps {
    isFull: boolean;
}

const MapWithPoint = ({ isFull }: MapWithPointProps) => {
    return (
        <div style={{ height: 550, marginTop: 60, display: "flex", gap: 50 }}>
            <Block />
            <YMap expanded={isFull} />
        </div>
    );
};
export default MapWithPoint;
