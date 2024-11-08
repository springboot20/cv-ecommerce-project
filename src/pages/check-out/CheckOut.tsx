import CheckOutForm from "../../components/check-out/CheckOutForm";
import Shoe from "../../assets/running-shoes-sneakers.png";

const CheckOut = () => {
  return (
    <main className="mx-auto max-w-7xl px-2 md:px-4 xl:px-0">
      <h2 className="mb-2 text-base sm:text-xl lg:text-2xl font-semibold text-gray-700 uppercase">checkout</h2>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <CheckOutForm className="mb-12 order-2" />
        <div>
          <img src={Shoe} className="w-full" />
        </div>
      </div>
    </main>
  );
};

export default CheckOut;
