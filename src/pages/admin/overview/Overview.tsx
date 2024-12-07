import { PieOverview } from "./orders/PieOverview";

export default function Overview() {
  return (
    <div className="max-w-7xl mx-auto mt-4 grid grid-cols-1 xl:grid-cols-3 gap-6">
      <div className="bg-white rounded-lg p-4 col-span-1 xl:col-span-2 w-full"></div>
      <div className="bg-white rounded-lg p-4 col-span-1 w-full">
        <PieOverview />
      </div>
    </div>
  );
}
