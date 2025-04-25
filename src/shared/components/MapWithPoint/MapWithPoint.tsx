import React from "react";
import { YMap } from "../Map/Map";
import Block from "../Block/Block";

const MapWithPoint = () => {
  return (
    <div
      style={{
        height: 550,
        marginTop: 60,
        display: "flex",
      }}
    >
      <Block />
      <YMap />
    </div>
  );
};

export default MapWithPoint;
