import { Fragment, useEffect, useState } from "react";
import { classNames } from "../../helpers";
import { motion } from "framer-motion";
import { Pagination } from "../../components/Pagination";
import { gridVariants } from "../../util/framerMotion.config";
import { useGetAllProductsQuery } from "../../features/products/product.slice";
import { ProductCategory, ProductType } from "../../types/redux/product";
import { ProductsSkeletonLoading } from "../../components/loaders/Skeleton";
import { CategoryPanel } from "../../components/panels/CategoryPanel";
import { Disclosure } from "@headlessui/react";
import { Bars3Icon } from "@heroicons/react/24/outline";
import { LocalStorage } from "../../util";
import { useGetAllCategoryQuery } from "../../features/category/category.slice";
import ProductPreviewModal from "../../components/modal/PreviewProductModal";
import { Product } from "./Product";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";

const Products = () => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [page, setPage] = useState<number>(1);
  const navigate = useNavigate();
  const [openPreview, setOpenPreview] = useState<{ [key: string]: boolean }>({});
  // const [categoryQuery, setCategoryQuery] = useState<string>("");
  const [colorsQuery, setColorsQuery] = useState<string[]>([]);
  const [sizesQuery, setSizesQuery] = useState<string[]>([]);
  const limit = 10;

  const [initialFilterState, setInitialFilterState] = useState({
    limit,
    page,
    featured: false,
    name: "",
    colors: "",
    sizes: "",
  });

  const { data: categoriedData } = useGetAllCategoryQuery();
  const { data, isLoading, refetch } = useGetAllProductsQuery(initialFilterState);

  const categories = categoriedData?.data.categories as ProductCategory[];

  const products = data?.data?.products ?? (LocalStorage.get("products") as ProductType[]);

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

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);

    // Update filter state with search query
    setInitialFilterState((prev) => ({
      ...prev,
      name: query,
    }));
  };

  const handlePreviewOpen = (id: string) => setOpenPreview((prev) => ({ ...prev, [id]: true }));
  const handlePreviewClose = (id: string) => setOpenPreview((prev) => ({ ...prev, [id]: false }));

  useEffect(() => {
    refetch();
    toast.success(data?.message);

    console.log("fetched");
  }, [refetch, data?.message]);

  useEffect(() => {
    if (searchQuery.trim() !== " ") {
      navigate(`/collections?search=${searchQuery}`);
    }

    if (colorsQuery?.length !== 0) {
      navigate(`/collections?search=${searchQuery}&colors=${colorsQuery}`);
    }

    if (sizesQuery?.length !== 0) {
      navigate(`/collections?search=${searchQuery}&colors=${colorsQuery}&sizes=${sizesQuery}`);
    }

    return () => navigate(`/collections`);
  }, [searchQuery, colorsQuery, sizesQuery, setSearchQuery, setColorsQuery, setSizesQuery]);

  // Refetch when filter state changes
  useEffect(() => {
    refetch();
  }, [initialFilterState, refetch]);

  const colors = products?.map((p: ProductType) => p?.colors || []).filter(Boolean);
  const sizes = products?.map((p: ProductType) => p?.sizes || []).filter(Boolean);

  // Update page in filter state when page changes
  useEffect(() => {
    setInitialFilterState((prev) => ({
      ...prev,
      page,
    }));
  }, [page]);

  return (
    <Disclosure>
      <section className="relative flex items-stretch justify-between flex-shrink-0">
        <CategoryPanel
          colors={colors}
          sizes={sizes}
          setSizesQuery={setSizesQuery}
          setColorsQuery={setColorsQuery}
          handleSearch={handleSearch}
          categories={categories}
          setInitialFilterState={setInitialFilterState}
        />
        <div
          className={classNames(
            isLoading ? "h-auto" : "h-auto",
            "w-full absolute justify-between left-0 right-0 lg:left-[24rem] lg:w-[calc(100%-24rem)] px-4 xl:px-0 xl:pl-4"
          )}
        >
          <div className="lg:hidden">
            <Disclosure.Button>
              <span className="sr-only">Open side panel</span>
              <Bars3Icon className="h-6" aria-hidden={true} />
            </Disclosure.Button>
          </div>

          {/* Active filters display */}
          {(colorsQuery.length > 0 || sizesQuery.length > 0 || searchQuery) && (
            <div className="mt-4 flex flex-wrap gap-2 items-center">
              <span className="text-sm font-medium text-gray-700">Active filters:</span>

              {searchQuery && (
                <span className="inline-flex items-center rounded-full bg-indigo-100 px-3 py-0.5 text-sm font-medium text-indigo-800">
                  Search: {searchQuery}
                </span>
              )}

              {colorsQuery.length > 0 && (
                <span className="inline-flex items-center rounded-full bg-blue-100 px-3 py-0.5 text-sm font-medium text-blue-800">
                  Colors: {colorsQuery.join(", ")}
                </span>
              )}

              {sizesQuery.length > 0 && (
                <span className="inline-flex items-center rounded-full bg-green-100 px-3 py-0.5 text-sm font-medium text-green-800">
                  Sizes: {sizesQuery.join(", ")}
                </span>
              )}

              <button
                onClick={() => {
                  setInitialFilterState({
                    limit: 10,
                    page: 1,
                    featured: false,
                    name: "",
                    colors: "",
                    sizes: "",
                    // category: "",
                  });
                  setColorsQuery([]);
                  setSizesQuery([]);
                  setSearchQuery("");
                }}
                className="text-sm text-red-600 hover:text-red-800"
              >
                Clear all
              </button>
            </div>
          )}
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
              <p className="font-medium text-gray-700 text-lg text-center">
                No product found for "{searchQuery}"
              </p>
            ) : products?.length === 0 ? (
              <ProductsSkeletonLoading cardsNumber={8} />
            ) : (
              products?.map((product: ProductType) => (
                <Fragment key={product._id}>
                  <ProductPreviewModal
                    open={!!openPreview[product?._id]}
                    onClose={() => handlePreviewClose(product?._id)}
                    productId={product?._id}
                  />
                  <Product product={product} handlePreviewOpen={handlePreviewOpen} />
                </Fragment>
              ))
            )}
          </motion.div>
          {products?.lenght > 10 && (
            <Pagination
              page={page}
              totalPages={totalPages}
              hasNextPage={hasNextPage}
              handlePreviousPage={handlePreviousPage}
              handleNextPage={handleNextPage}
            />
          )}
        </div>
      </section>
    </Disclosure>
  );
};

export default Products;
