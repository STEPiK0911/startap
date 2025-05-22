import React, { useEffect, useState } from "react";
import { Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";
import Papa from "papaparse";

const FunnelSegment = ({ level, label, count, total }: { level: number; label: string; count: number; total: number }) => {
    const height = 60;
    const widthTop = 300 * (1 - (level - 1) * 0.2);
    const widthBottom = 300 * (1 - level * 0.2);

    return (
        <svg width={300} height={height}>
            <polygon
                points={`0,0 ${widthTop},0 ${widthBottom},${height} 0,${height}`}
                fill="#8884d8"
                stroke="white"
                transform={`translate(${(300 - widthTop) / 2}, 0)`}
            />
            <text x={150} y={height / 2} textAnchor="middle" fill="white" fontSize={14} dy=".3em">
                {`${label}: ${count}`}
            </text>
        </svg>
    );
};

const SaleGraphics = () => {
    const [pieData, setPieData] = useState([]);
    const [funnelData, setFunnelData] = useState([
        { label: "Прошли вдоль", count: 0 },
        { label: "Подошли", count: 0 },
        { label: "Преобрели", count: 0 },
    ]);

    useEffect(() => {
        Papa.parse("/face_stats.csv", {
            download: true,
            header: true,
            complete: (result) => {
                const genderCounts = result.data.reduce((acc, row) => {
                    try {
                        const genderStr = row.gender;
                        const parsed = JSON.parse(genderStr.replace(/'/g, '"'));
                        const winner = parsed.Woman > parsed.Man ? "Woman" : "Man";
                        acc[winner] = (acc[winner] || 0) + 1;
                    } catch {}
                    return acc;
                }, {});

                setPieData(
                    Object.entries(genderCounts).map(([name, value]) => ({
                        name,
                        value,
                    }))
                );

                setFunnelData([
                    { label: "Прошли вдоль", count: result.data.length },
                    { label: "Подошли", count: Math.round(result.data.length * 0.6) },
                    { label: "Преобрели", count: Math.round(result.data.length * 0.2) },
                ]);
            },
        });
    }, []);

    return (
        <div style={{ display: "flex", flexDirection: "row" }}>
            <div style={{ width: 300, backgroundColor: "white", padding: 10 }}>
                <h4 style={{ textAlign: "center" }}>Воронка продаж</h4>
                {funnelData.map((item, idx) => (
                    <FunnelSegment
                        key={idx}
                        level={idx + 1}
                        label={item.label}
                        count={item.count}
                        total={funnelData[0].count}
                    />
                ))}
            </div>
            <div style={{ display: "flex", flexDirection: "row", marginLeft: 50 }}>
                <div style={{ width: 275, height: 275, backgroundColor: "white" }}>
                    <ResponsiveContainer width={200} height={200}>
                        <PieChart>
                            <Pie
                                dataKey="value"
                                isAnimationActive={false}
                                data={pieData}
                                cx="50%"
                                cy="50%"
                                fill="#8884d8"
                                label
                            />
                            <Tooltip />
                        </PieChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    );
};

export default SaleGraphics;
