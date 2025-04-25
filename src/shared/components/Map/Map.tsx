import React from "react";
import { Map } from "@pbe/react-yandex-maps";
export const YMap = () => {
  return (
    <div style={{ width: 100, height: 200, marginLeft: 50 }}>
      <Map
        defaultState={{ center: [55.75, 37.57], zoom: 9 }}
        height={500}
        width={600}
      />
    </div>
  );
};

export default Map;
