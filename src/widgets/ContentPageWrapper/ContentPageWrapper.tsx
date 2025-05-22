import React, { useRef, useState, useEffect } from "react";
import MapWithPoint from "@shared/components/MapWithPoint/MapWithPoint";
import Search from "@shared/components/Search/Search";
import SaleGraphics from "@shared/components/SaleGraphics/SaleGraphics";
import InviteGraphics from "@shared/components/InviteGraphics/InviteGraphics";

const ContentPageWrapper = () => {
  const [isMapFull, setIsMapFull] = useState(false);
  const [isMouseOverMap, setIsMouseOverMap] = useState(false);
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  useEffect(() => {
    if (!isSearchFocused && !isMouseOverMap) {
      const timeout = setTimeout(() => setIsMapFull(false), 300);
      return () => clearTimeout(timeout);
    }
  }, [isSearchFocused, isMouseOverMap]);

  return (
    <>
      <Search
        onFocus={() => {
          setIsSearchFocused(true);
          setIsMapFull(true);
        }}
        onBlur={() => setIsSearchFocused(false)}
      />

      <div
        onMouseEnter={() => setIsMouseOverMap(true)}
        onMouseLeave={() => setIsMouseOverMap(false)}
      >
        <MapWithPoint isFull={isMapFull} />
      </div>

      <SaleGraphics />
      <InviteGraphics />
    </>
  );
};

export default ContentPageWrapper;
