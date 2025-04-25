import React from "react";
import { Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";

const data01 = [
  { name: "Group A", value: 400 },
  { name: "Group B", value: 300 },
  { name: "Group C", value: 300 },
  { name: "Group D", value: 200 },
  { name: "Group E", value: 278 },
  { name: "Group F", value: 189 },
];

const SaleGraphics = () => {
  return (
    <div style={{ display: "flex", flexDirection: "row" }}>
      <div style={{ width: 500, height: 275, backgroundColor: "white" }}>
        воронка
      </div>
      <div style={{ display: "flex", flexDirection: "row", marginLeft: 50 }}>
        <div style={{ width: 275, height: 275, backgroundColor: "white" }}>
          <ResponsiveContainer width={200} height={200}>
            <PieChart width={150} height={150}>
              <Pie
                dataKey="value"
                isAnimationActive={false}
                data={data01}
                cx="50%"
                cy="50%"
                fill="#8884d8"
              />
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div
          style={{
            width: 275,
            height: 275,
            backgroundColor: "white",
            marginLeft: 50,
          }}
        >
          <ResponsiveContainer width={200} height={200}>
            <PieChart width={150} height={150}>
              <Pie
                dataKey="value"
                isAnimationActive={false}
                data={data01}
                cx="50%"
                cy="50%"
                fill="#8884d8"
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
