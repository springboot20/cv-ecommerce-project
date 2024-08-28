import { useState, useEffect } from "react";
import { HeartIcon, PlusIcon, MinusIcon } from "@heroicons/react/24/outline";
import { Button, Rating } from "@material-tailwind/react";
import { motion } from "framer-motion";
import { useParams } from "react-router-dom";
import { Disclosure } from "@headlessui/react";
import { gridVariants } from "../../util/framerMotion.config";
import { formatPrice } from "../../helpers";
import { useGetProductByIdQuery } from "../../features/products/product.slice";
import { toast } from "react-toastify";
import { ProductType } from "../../types/redux/product";
import { ProductSkeletonLoading } from "../../components/loaders/Skeleton";

const Product = () => {
  const { id } = useParams();
  const [favorite, setFavorite] = useState<boolean>(false);
  const [quantity, setQuantity] = useState<number>(1);
  const { data, isLoading, error, refetch } = useGetProductByIdQuery(id as string);
  const [ratings, setRatings] = useState<number>(0);

  const setRatingsValue = (rating: number) => setRatings(rating);

  const product = data?.data.product as ProductType;

  useEffect(() => {
    if (data?.message) {
      toast.success(data?.message);
    }
    refetch();
  }, []);

  return (
    <motion.main layout initial="hidden" animate="visible" variants={gridVariants}>
      <section className="grid grid-cols-1 lg:grid-cols-2 max-w-2xl lg:max-w-full mx-auto place-items-center lg:place-items-start place-content-center gap-8 px-8">
        {isLoading ? (
          <ProductSkeletonLoading />
        ) : (
          <>
            <div className="col-span-full lg:col-span-1 flex items-start gap-2">
              <div className="bg-[#d2d2d2] h-[35rem] relative rounded-2xl overflow-hidden w-full">
                <img
                  src={product?.imageSrc?.url}
                  alt=""
                  className="object-cover object-center w-full h-full"
                />
              </div>
            </div>
            <div className="col-span-full lg:col-span-1 w-full">
              <div className="space-y-3">
                <div className="flex items-center justify-between w-full">
                  <h3 className="uppercase text-2xl font-bold text-gray-800">{product?.name}</h3>
                  <p className="text-2xl font-bold text-[#e2342d] uppercase">
                    {formatPrice(product?.price ?? 0.0)}
                  </p>
                </div>
                <div className="flex items-center gap-1">
                  <span className="text-base font-semibold text-gray-600">3.9</span>
                  <Rating value={ratings} className="h-8" onChange={(value)=> setRatingsValue(value)}/>
                </div>
              </div>
              <div className="flex items-center space-x-5 mt-8">{/* Color buttons */}</div>

              <div className="mt-3 col-span-full">
                <form className="grid grid-cols-2 space-y-4 ">
                  <fieldset className="col-span-full md:col-span-3 relative flex justify-between items-center">
                    <Button
                      type="button"
                      id="minus-btn"
                      variant="text"
                      onClick={() => setQuantity((prevQuantity) => prevQuantity - 1)}
                      className="p-3 text-gray-800 focus:ring-offset-2 transition-all flex items-center dark:text-white"
                    >
                      <MinusIcon id="minus-icon" className="h-5 w-5" />
                    </Button>
                    <span className="text-2xl text-gray-800 dark:text-white font-semibold">
                      {quantity}
                    </span>
                    <Button
                      type="button"
                      id="plus-btn"
                      variant="text"
                      className="p-3 text-gray-800 focus:ring-offset-2 transition-all flex items-center dark:text-white"
                      onClick={() => setQuantity((prevQuantity) => prevQuantity + 1)}
                    >
                      <PlusIcon id="plus-icon" className="h-5 w-5" />
                    </Button>
                  </fieldset>

                  <div className="flex items-center space-x-6 col-span-full">
                    <Button
                      className="w-full uppercase text-center py-3.5 shadow-none text-base mt-14 bg-indigo-600 rounded-lg font-semibold"
                      // onClick={handleAddToCart}
                      fullWidth
                    >
                      add to cart
                    </Button>
                  </div>
                </form>
              </div>

              <div className="mt-6">
                <p className="text-xl font-medium text-gray-700">{product?.description}</p>

                <Disclosure as="ul" className="mt-10 space-y-5">
                  {/* Disclosure items */}
                </Disclosure>
              </div>
            </div>
          </>
        )}
      </section>
    </motion.main>
  );
};

export default Product;
