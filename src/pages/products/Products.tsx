import { Fragment, useEffect, useRef, useState } from "react";
import { classNames, formatPrice } from "../../helpers";
import { motion } from "framer-motion";
import { Pagination } from "../../components/Pagination";
import { gridVariants } from "../../util/framerMotion.config";
// import { Loader } from "../../components/Loader";
import { toast } from "react-toastify";
import { useGetAllProductsQuery } from "../../features/products/product.slice";
import { ProductCategory, ProductType } from "../../types/redux/product";
import { ProductsSkeletonLoading } from "../../components/loaders/Skeleton";
import { CategoryPanel } from "../../components/panels/CategoryPanel";
import { Disclosure } from "@headlessui/react";
import { Bars3Icon, EyeIcon } from "@heroicons/react/24/outline";
import {  LocalStorage } from "../../util";
import { useGetAllCategoryQuery } from "../../features/category/category.slice";
import Skeleton from "react-loading-skeleton";
import ProductPreviewModal from "../../components/modal/PreviewProductModal";
import { Link } from "react-router-dom";

const Products = () => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  // const [featured, setFeatured] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);
  const [openPreview, setOpenPreview] = useState<{ [key: string]: boolean }>({});
  // const [categoryQuery, setCategoryQuery] = useState<string>("");
  const displayedMessages = useRef<Set<string>>(new Set());

  let limit = 10;

  const { data: categoriedData } = useGetAllCategoryQuery();
  const { data, isLoading } = useGetAllProductsQuery({
    limit,
    page,
    featured: false,
    name: searchQuery,
  });

  const categories = categoriedData?.data.categories as ProductCategory[];

  let products = data?.data?.products ?? (LocalStorage.get("products") as ProductType[]);

  const totalPages = data?.data?.totalPages ?? 1;
  const hasNextPage = data?.data?.hasNextPage ?? false;

  const handleNextPage = () => {
    if (hasNextPage) {
      setPage((prevPage) => Math.min(prevPage + 1, totalPages));
    }
  };

  const handlePreviousPage = () => {
    if (page > 1) {
      setPage((prevPage) => prevPage - 1);
    }
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => setSearchQuery(e.target.value);

  useEffect(() => {
    if (data?.message && !displayedMessages.current.has(data.message)) {
      toast.success(data.message);
      displayedMessages.current.add(data.message);
    }
  }, [data?.message]);

  const handlePreviewOpen = (id: string) => setOpenPreview((prev) => ({ ...prev, [id]: true }));
  const handlePreviewClose = (id: string) => setOpenPreview((prev) => ({ ...prev, [id]: false }));

  return (
    <Disclosure>
      <section className="relative flex items-stretch justify-between flex-shrink-0">
        <CategoryPanel handleSearch={handleSearch} categories={categories} />
        <div
          className={classNames(
            isLoading ? "h-auto" : "h-auto",
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
            className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 gap-5 mt-4"
          >
            {isLoading ? (
              <ProductsSkeletonLoading cardsNumber={6} />
            ) : searchQuery && products?.length === 0 ? (
              <p className="font-semibold text-gray-700 text-xl text-center">
                No product found for "{searchQuery}"
              </p>
            ) : (
              products?.map((product: ProductType) => (
                <Fragment key={product._id}>
                  <ProductPreviewModal
                    open={!!openPreview[product?._id]}
                    onClose={() => handlePreviewClose(product?._id)}
                    productId={product?._id}
                  />
                  <motion.div role="button" layout className="relative group overflow-hidden">
                    <header className="h-52 w-full relative rounded-xl overflow-hidden">
                      {product?.imageSrc.url ? (
                        <img
                          src={product?.imageSrc?.url}
                          alt=""
                          className="h-full absolute object-cover object-center w-full"
                        />
                      ) : (
                        <Skeleton
                          height={"100%"}
                          // style={{ position: "absolute", objectFit: "cover" }}
                          borderRadius={0}
                          className="border border-gray-300 absolute object-cover"
                        />
                      )}
                      <div className="group-hover:opacity-100 transition z-20 opacity-0 absolute inset-0 h-full w-full flex flex-col py-4 items-center justify-end">
                        <button
                          type="button"
                          onClick={() => handlePreviewOpen(product?._id)}
                          className="z-20 bg-gray-100/90 border text-gray-600 font-normal text-sm flex items-center gap-4 rounded p-2 capitalize"
                        >
                          preview product <EyeIcon className="h-5" aria-hidden={true} />
                        </button>
                      </div>
                    </header>
                    <div className="relative flex pt-2 justify-between gap-1.5">
                      <h3 className="capitalize text-base font-medium text-gray-700">
                        <Link to={`/collections/${product?._id}`}> {product?.name}</Link>
                      </h3>
                      <p className="text-base text-gray-700 font-medium">
                        {formatPrice(product?.price)}
                      </p>
                    </div>
                  </motion.div>
                </Fragment>
              ))
            )}
          </motion.div>
          <Pagination
            page={page}
            totalPages={totalPages}
            hasNextPage={hasNextPage}
            handlePreviousPage={handlePreviousPage}
            handleNextPage={handleNextPage}
          />
        </div>
      </section>
    </Disclosure>
  );
};

export default Products;
