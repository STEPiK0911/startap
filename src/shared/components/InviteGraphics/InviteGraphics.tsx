import React, { useEffect, useState } from "react";
import {
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";
import Papa from "papaparse";

const InviteGraphics = () => {
  const [pieData, setPieData] = useState([]);
  const [ageData, setAgeData] = useState([]);

  useEffect(() => {
    Papa.parse("/face_stats.csv", {
      download: true,
      header: true,
      complete: (result) => {
        const rows = result.data.filter(
          (row) => row.age && row.gender && row.emotion
        );

        // Для PieChart по эмоциям
        const emotionCounts = rows.reduce((acc, row) => {
          const emotion = row.emotion;
          acc[emotion] = (acc[emotion] || 0) + 1;
          return acc;
        }, {} as Record<string, number>);

        const pie = Object.entries(emotionCounts).map(([key, value]) => ({
          name: key,
          value,
        }));

        setPieData(pie);

        // Для AreaChart по возрасту
        const ages = rows.map((row) => ({
          name: row.timestamp.split("T")[1].slice(0, 8),
          age: parseInt(row.age, 10),
        }));

        setAgeData(ages);
      },
    });
  }, []);

  return (
    <div style={{ display: "flex", flexDirection: "row", marginTop: 60 }}>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <div
          style={{
            width: 750,
            height: 300,
            backgroundColor: "white",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <ResponsiveContainer width={600} height={200}>
            <AreaChart data={ageData} defaultShowTooltip={false}>
              <CartesianGrid
                strokeDasharray="3 3"
                opacity={0.1}
                vertical={false}
              />
              <XAxis
                dataKey="name"
                interval="preserveStartEnd"
                textAnchor="end"
                dy={10}
              />
              <YAxis />
              <Tooltip />
              <Area
                type="monotone"
                dataKey="age"
                stroke="#8884d8"
                fill="#8884d8"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default InviteGraphics;
