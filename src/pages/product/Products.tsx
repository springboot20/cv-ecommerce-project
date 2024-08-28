import { Fragment, useEffect, useState } from "react";
import { classNames, formatPrice } from "../../helpers";
import { motion } from "framer-motion";
import { Pagination } from "../../components/Pagination";
import { gridVariants } from "../../util/framerMotion.config";
// import { Loader } from "../../components/Loader";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { useGetAllProductsQuery } from "../../features/products/product.slice";
import { ProductType } from "../../types/redux/product";
import { ProductsSkeletonLoading } from "../../components/loaders/Skeleton";
import { CategoryPanel } from "../../components/panels/CategoryPanel";
import { Disclosure } from "@headlessui/react";
import { Bars3Icon } from "@heroicons/react/24/outline";

const Products = () => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [featured, setFeatured] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);

  let limit = 10;

  const { data, isLoading, refetch } = useGetAllProductsQuery({
    limit,
    page,
    featured: false,
    name: searchQuery,
  });

  let products = data?.data?.products;

  const totalPages = data?.data?.totalPages ?? 1;
  const hasNextPage = data?.data?.hasNextPage ?? false;
  const hasPrevPage = data?.data?.hasPrevPage ?? false;

  const handleNextPage = () => {
    if (hasNextPage) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (hasPrevPage) {
      setPage((prevPage) => Math.max(prevPage - 1, 1));
    }
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => setSearchQuery(e.target.value);

  useEffect(() => {
    if (data?.message) {
      toast.success(data?.message);
    }
    refetch();
  }, []);

  return (
    <Disclosure>
      <section className="relative flex items-stretch justify-between flex-shrink-0">
        <CategoryPanel handleSearch={handleSearch} />
        <div
          className={classNames(
            isLoading ? "h-auto" : "min-h-screen",
            "w-full absolute justify-between left-0 right-0 lg:left-[24rem] lg:w-[calc(100%-24rem)] px-4 xl:px-0 xl:pl-4",
          )}
        >
          <div className="lg:hidden">
            <Disclosure.Button>
              <span className="sr-only">Open side panel</span>
              <Bars3Icon className="h-6" aria-hidden={true} />
            </Disclosure.Button>
          </div>
          <motion.div
            layout
            initial="hidden"
            animate="visible"
            variants={gridVariants}
            className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 gap-5"
          >
            {isLoading ? (
              <ProductsSkeletonLoading cardsNumber={9} />
            ) : searchQuery && products.length === 0 ? (
              <p className="font-semibold text-gray-700 text-xl text-center">
                No country found for "{searchQuery}"
              </p>
            ) : (
              products?.map((product: ProductType) => (
                <Link to={`/collections/${product._id}`} key={product._id}>
                  <motion.div layout key={product._id}>
                    <header className="h-52 w-full relative rounded-xl overflow-hidden">
                      <img
                        src={product?.imageSrc.url}
                        alt=""
                        className="h-full absolute object-cover object-center w-full"
                      />
                    </header>
                    <div className="relative flex pt-2 justify-between gap-1.5">
                      <h3 className="capitalize text-lg font-semibold text-gray-700">
                        {product.name}
                      </h3>
                      <p className="text-lg font-medium">{formatPrice(product.price)}</p>
                    </div>
                  </motion.div>
                </Link>
              ))
            )}
          </motion.div>
          <Pagination
            page={page}
            totalPages={totalPages}
            hasNextPage={hasNextPage}
            hasPrevPage={hasPrevPage}
            handlePreviousPage={handlePreviousPage}
            handleNextPage={handleNextPage}
          />
        </div>
      </section>
    </Disclosure>
  );
};

export default Products;
