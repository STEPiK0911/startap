import React from "react";
import { Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid } from "recharts";

const data = [
  {
    name: "Page A",
    uv: 4000,
    pv: 2400,
    amt: 2400,
  },
  {
    name: "Page B",
    uv: 3000,
    pv: 1398,
    amt: 2210,
  },
  {
    name: "Page C",
    uv: 2000,
    pv: 9800,
    amt: 2290,
  },
  {
    name: "Page D",
    uv: 2780,
    pv: 3908,
    amt: 2000,
  },
  {
    name: "Page E",
    uv: 1890,
    pv: 4800,
    amt: 2181,
  },
  {
    name: "Page F",
    uv: 2390,
    pv: 3800,
    amt: 2500,
  },
  {
    name: "Page G",
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
];
const data01 = [
  { name: "Group A", value: 400 },
  { name: "Group B", value: 300 },
  { name: "Group C", value: 300 },
  { name: "Group D", value: 200 },
  { name: "Group E", value: 278 },
  { name: "Group F", value: 189 },
];

const InviteGraphics = () => {
  return (
    <div style={{ display: "flex", flexDirection: "row", marginTop: 60 }}>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <div
          style={{
            width: 670,
            height: 200,
            backgroundColor: "white",
          }}
        >
          <ResponsiveContainer width={250} height={150}>
            <AreaChart
              width={120}
              height={100}
              data={data}
              margin={{
                top: 10,
                right: 30,
                left: 0,
                bottom: 0,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Area
                type="monotone"
                dataKey="uv"
                stroke="#8884d8"
                fill="#8884d8"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
        <div
          style={{
            width: 670,
            height: 200,
            backgroundColor: "white",
            marginTop: 30,
          }}
        >
          <ResponsiveContainer width={250} height={150}>
            <AreaChart
              width={120}
              height={100}
              data={data}
              margin={{
                top: 10,
                right: 30,
                left: 0,
                bottom: 0,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Area
                type="monotone"
                dataKey="uv"
                stroke="#8884d8"
                fill="#8884d8"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
        <div
          style={{
            width: 670,
            height: 200,
            backgroundColor: "white",
            marginTop: 30,
          }}
        >
          <ResponsiveContainer width={250} height={150}>
            <AreaChart
              width={120}
              height={100}
              data={data}
              margin={{
                top: 10,
                right: 30,
                left: 0,
                bottom: 0,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Area
                type="monotone"
                dataKey="uv"
                stroke="#8884d8"
                fill="#8884d8"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
        <div
          style={{
            width: 670,
            height: 200,
            backgroundColor: "white",
            marginTop: 30,
          }}
        >
          <ResponsiveContainer width={250} height={150}>
            <AreaChart
              width={120}
              height={100}
              data={data}
              margin={{
                top: 10,
                right: 30,
                left: 0,
                bottom: 0,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Area
                type="monotone"
                dataKey="uv"
                stroke="#8884d8"
                fill="#8884d8"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          backgroundColor: "white",
          marginLeft: 50,
          width: 430,
          height: 600,
        }}
      >
        <ResponsiveContainer width={350} height={350}>
          <PieChart width={350} height={350}>
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
  );
};

export default InviteGraphics;
