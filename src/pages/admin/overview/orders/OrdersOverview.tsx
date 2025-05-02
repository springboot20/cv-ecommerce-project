import OrderCountsChart from "./AreaOverview";
import { PieOverview } from "./PieOverview";

export const OrdersOverview = () => {
  return (
    <div className="max-w-7xl mx-auto mt-4 grid grid-cols-1 xl:grid-cols-3 gap-6">
      <div className="bg-white rounded-lg p-4 col-span-1 xl:col-span-2 w-full border min-h-72 md:min-h-96">
        <OrderCountsChart />
      </div>
      <div className="bg-white rounded-lg p-4 col-span-1 border grid place-items-center xl:place-items-stretch min-h-72 md:min-h-96">
        <PieOverview />
      </div>
    </div>
  );
};
