import DashBoardDemo from "./DashBoardDemo";
import FeaturedGrid from "./FeaturedGrid";

export default function Featured() {
    return (
      <div class="container mx-auto px-4 pb-20">
        <FeaturedGrid />
        <DashBoardDemo />
      </div>
    );
  }