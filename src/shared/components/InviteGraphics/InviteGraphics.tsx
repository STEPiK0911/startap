// InviteGraphics.tsx
import React, { useEffect, useState } from "react";
import {
  PieChart, Pie, Tooltip, ResponsiveContainer,
  AreaChart, Area, XAxis, YAxis, CartesianGrid,
} from "recharts";
import Papa from "papaparse";

const InviteGraphics = ({ pointId }: { pointId: string }) => {
  const [pieData, setPieData] = useState([]);
  const [ageData, setAgeData] = useState([]);

  useEffect(() => {
    if (!pointId) return;

    Papa.parse(`/face_stats_${pointId}.csv`, {
      download: true,
      header: true,
      complete: (result) => {
        const rows = result.data.filter((row) => row.age && row.gender && row.emotion);

        const emotionCounts = rows.reduce((acc, row) => {
          const emotion = row.emotion;
          acc[emotion] = (acc[emotion] || 0) + 1;
          return acc;
        }, {} as Record<string, number>);

        const pie = Object.entries(emotionCounts).map(([name, value]) => ({
          name,
          value,
        }));
        setPieData(pie);

        const ages = rows.map((row) => ({
          name: row.timestamp?.split("T")[1]?.slice(0, 8) ?? "",
          age: parseInt(row.age, 10),
        }));
        setAgeData(ages);
      },
    });
  }, [pointId]);

  return (
      <div style={{ display: "flex", flexDirection: "row" }}>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ width: 724, height: 275, backgroundColor: "white", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <ResponsiveContainer width={600} height={200}>

              <h1 style={{position: "absolute",
                top: 800,
                right: 110,
                width: 400,
                height: 200,
                fontSize: 19}}>Чел./время</h1>

              <AreaChart data={ageData}>
                <CartesianGrid strokeDasharray="3 3" opacity={0.1} vertical={false} />
                <XAxis dataKey="name" dy={10} />
                <YAxis />
                <Tooltip />
                <Area type="monotone" dataKey="age" stroke="#8884d8" fill="#8884d8" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
          <div
              style={{
                position: "absolute",
                top: 800,
                right: 690,
                width: 400,
                height: 200,
                fontSize: 9
              }}
          >
            <h1>
            Настроение
            </h1>
          </div>
          <div
              style={{
                position: "absolute",
                top: 820,
                right: 830,
                width: 400,
                height: 200,
              }}
          >
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={pieData} dataKey="value" nameKey="name" fill="#8884d8" label />
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
  );
};

export default InviteGraphics;
