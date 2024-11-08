import { Fragment } from "react";
import { Link, useNavigate } from "react-router-dom";
import CollectionImage from "../../assets/incendiary-fantastically-beautiful-girl.png";
import { useAppSelector } from "../../hooks/redux/redux.hooks";
import { RootState } from "../../app/store";
import { formatPrice } from "../../helpers";
import { ArrowRightIcon } from "@heroicons/react/24/outline";
import Slider from "react-slick";
import { productCarouselSettings } from "../../util/slickSlider.config";

const Home = () => {
  const { products } = useAppSelector((state: RootState) => state.product);
  const navigate = useNavigate();

  return (
    <Fragment>
      <main className="relative px-4 xl:h-[80vh]">
        <div className="grid grid-cols-1 lg:grid-cols-2 place-content-center place-items-center gap-3 h-full">
          <div className="col-span-full md:col-span-1 space-y-4 w-full">
            <h1 className="text-xl sm:text-2xl lg:text-3xl xl:text-4xl font-semibold text-gray-900 capitalize">
              collections
            </h1>
            <p className="text-lg sm:text-xl xl:text-2xl">
              You can explore and shop many different collection from various brands here
            </p>

            <button
              type="button"
              className="rounded-md py-2 px-4 bg-gray-800 flex items-center capitalize gap-2 text-white "
            >
              <svg
                width="30"
                height="30"
                viewBox="0 0 30 30"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M9.75 8.25C9.75 5.39062 12.0938 3 15 3C17.8594 3 20.25 5.39062 20.25 8.25V10.5H23.25C24.4688 10.5 25.5 11.5312 25.5 12.75V22.5C25.5 24.9844 23.4844 27 21 27H9C6.46875 27 4.5 24.9844 4.5 22.5V12.75C4.5 11.5312 5.48438 10.5 6.75 10.5H9.75V8.25ZM12 10.5H18V8.25C18 6.60938 16.6406 5.25 15 5.25C13.3125 5.25 12 6.60938 12 8.25V10.5ZM10.875 15C11.4844 15 12 14.5312 12 13.875C12 13.2656 11.4844 12.75 10.875 12.75C10.2188 12.75 9.75 13.2656 9.75 13.875C9.75 14.5312 10.2188 15 10.875 15ZM19.125 12.75C18.4688 12.75 18 13.2656 18 13.875C18 14.5312 18.4688 15 19.125 15C19.7344 15 20.25 14.5312 20.25 13.875C20.25 13.2656 19.7344 12.75 19.125 12.75Z"
                  fill="white"
                />
              </svg>
              <span className="inline-block text-sm sm:text-base">show now</span>
            </button>
          </div>
          <div className="col-span-full md:col-span-1 relative w-full">
            <div className="lg:h-[30rem] xl:h-full w-full">
              <img src={CollectionImage} alt="" className="object-top object-cover w-full h-full" />
            </div>
          </div>
        </div>
      </main>

      <section className="mt-8 px-4">
        <h1 className="text-base sm:text-xl lg:text-2xl xl:text-3xl font-semibold text-gray-900 capitalize">
          new arrival
        </h1>
        <Slider {...productCarouselSettings}>
          {products?.slice(0, 3).map((product) => (
            <div className="group" key={product._id}>
              <header className="group-hover:opacity-60 transition-all h-[24rem] w-full relative rounded-xl overflow-hidden">
                <img
                  src={product?.imageSrc.url}
                  alt=""
                  className="h-full absolute object-cover object-center w-full group-hover:scale-110 transition"
                />
              </header>
              <div className="relative flex pt-2 justify-between gap-1.5">
                <div className="">
                  <h3 className="capitalize text-base font-semibold text-gray-700">
                    {product.name}
                  </h3>
                  <p className="text-sm text-gray-800 font-medium">{formatPrice(product.price)}</p>
                </div>
                <button type="button" onClick={() => navigate(`/collections/${product._id}`)}>
                  <span className="sr-only">Goto product</span>
                  <ArrowRightIcon className="h-6 text-gray-600" strokeWidth={2.5} />
                </button>
              </div>
            </div>
          ))}
        </Slider>
      </section>

      <section className="mt-44 mb-10 px-4">
        <div className="flex items-start flex-col lg:flex-row gap-5 mt-10">
          <div className="w-full flex-1">
            <div className="flex items-center justify-between w-full">
              <h2 className="text-2xl space-x-1 font-bold uppercase">
                <span className="text-[#e2342d]">macc</span>
                <span className="text-[#4a4b4d]">weekly discount</span>
              </h2>
              <Link
                to="/collections"
                className="py-2.5 px-3 text-sm font-medium text-gray-700 bg-[#d2d2d2]"
              >
                View all
              </Link>
            </div>
          </div>
        </div>
      </section>
    </Fragment>
  );
};
export default Home;
