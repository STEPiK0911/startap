import InviteGraphics from "@shared/components/InviteGraphics/InviteGraphics";
import MapWithPoint from "@shared/components/MapWithPoint/MapWithPoint";
import SaleGraphics from "@shared/components/SaleGraphics/SaleGraphics";
import Search from "@shared/components/Search/Search";
import React from "react";

const ContentPageWrapper = () => {
  return (
    <div>
      <Search />
      <MapWithPoint />
      <SaleGraphics />
      <InviteGraphics />
    </div>
  );
};

export default ContentPageWrapper;
