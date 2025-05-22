import React, { useEffect, useState } from "react";
import { Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";
import Papa from "papaparse";

const Block = () => {
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
    <div style={{ height: 500, width: 500, backgroundColor: "white" }}>
      <ResponsiveContainer width="100%" height="100%">
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
  );
};

export default Block;
