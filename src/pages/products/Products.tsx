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
import { LocalStorage } from "../../util";
import { useGetAllCategoryQuery } from "../../features/category/category.slice";
import ProductPreviewModal from "../../components/modal/PreviewProductModal";
import { Product } from "./Product";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";
import { XMarkIcon } from "@heroicons/react/24/outline";

const Products = () => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [page, setPage] = useState<number>(1);
  const navigate = useNavigate();
  const [openPreview, setOpenPreview] = useState<{ [key: string]: boolean }>({});
  const [categoryQuery, setCategoryQuery] = useState<string>("");
  const [colorsQuery, setColorsQuery] = useState<string[]>([]);
  const [sizesQuery, setSizesQuery] = useState<string[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<ProductType[]>([]);
  const limit = 10;

  // Price range filter
  const [priceRange, setPriceRange] = useState({ min: 0, max: 1000 });

  // Sorting
  const [sortBy, setSortBy] = useState("featured");

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

  // Parse URL query parameters on load and when URL changes
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);

    // Get query parameters
    const categoryParam = searchParams.get("category") || "";
    const searchParam = searchParams.get("search") || "";
    const colorsParam = searchParams.get("colors") || "";
    const sizesParam = searchParams.get("sizes") || "";
    const minPrice = searchParams.get("minPrice") || "0";
    const maxPrice = searchParams.get("maxPrice") || "1000";
    const pageParam = searchParams.get("page") || "1";
    const sortByParam = searchParams.get("sortBy") || "featured";

    const sale = searchParams.get("sale") === "true";
    const newArrival = searchParams.get("new") === "true";
    const bestSellers = searchParams.get("bestsellers") === "true";

    // Update local state from URL
    setCategoryQuery(categoryParam);
    setSearchQuery(searchParam);
    setColorsQuery(colorsParam ? colorsParam.split(",") : []);
    setSizesQuery(sizesParam ? sizesParam.split(",") : []);
    setPriceRange({ min: parseInt(minPrice), max: parseInt(maxPrice) });
    setSortBy(sortByParam);
    setPage(parseInt(pageParam));

    const activeFilters: any = {};

    if (categoryParam) activeFilters.category = categoryParam;
    if (sale) activeFilters.sale = true;
    if (newArrival) activeFilters.new = true;
    if (bestSellers) activeFilters.bestsellers = true;

    setPage(1); // Reset pagination when filters change

    setInitialFilterState({
      limit,
      page: parseInt(pageParam),
      featured: bestSellers,
      name: searchParam,
      colors: colorsParam,
      sizes: sizesParam,
      // category: categoryParam,
      // ...(sale && { sale: true }),
      // ...(newArrival && { new: true }),
    });
  }, [location.search, limit]);

  useEffect(() => {
    if (isLoading) return;

    // Build query parameters object for cleaner URL construction
    const queryParams = new URLSearchParams();

    if (searchQuery.trim()) {
      queryParams.set("search", searchQuery.trim());
    }

    if (colorsQuery?.length > 0) {
      queryParams.set("colors", colorsQuery.join(","));
    }

    if (sizesQuery?.length > 0) {
      queryParams.set("sizes", sizesQuery.join(","));
    }

    if (priceRange.min > 0) {
      queryParams.set("minPrice", priceRange.min.toString());
    }

    if (priceRange.max < 1000) {
      queryParams.set("maxPrice", priceRange.max.toString());
    }

    if (sortBy !== "featured") {
      queryParams.set("sortBy", sortBy);
    }

    // Create the URL string with query parameters
    const queryString = queryParams.toString();
    const url = queryString ? `/collections?${queryString}` : "/collections";

    // Only navigate if URL needs to change
    if (location.search !== `?${queryString}`) {
      navigate(url, { replace: true });
    }
  }, [
    searchQuery,
    categoryQuery,
    colorsQuery,
    sizesQuery,
    priceRange,
    sortBy,
    page,
    navigate,
    location.search,
    isLoading,
  ]);

  // Apply filters and sorting to products
  useEffect(() => {
    if (!products || !products.length) return;

    let filtered = [...products] as ProductType[];

    // Apply search filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase().trim();
      filtered = filtered.filter(
        (product) =>
          product.name.toLowerCase().includes(query) ||
          product.description?.toLowerCase().includes(query) ||
          product.category?.name?.toLowerCase().includes(query)
      );
    }

    // Apply category filter
    if (categoryQuery) {
      filtered = filtered?.filter((product) => {
        // Check if it's a category ID or name
        if (categoryQuery.match(/^[0-9a-fA-F]{24}$/)) {
          return product.category?._id === categoryQuery;
        } else {
          return product.category?.name?.toLowerCase() === categoryQuery?.toLowerCase();
        }
      });
    }

    // Apply color filter
    if (colorsQuery.length > 0) {
      console.log(colors?.length);

      filtered = filtered?.filter((product) => {
        const productColors = product?.colors || [];
        return colorsQuery.some((color: any) => {
          console.log(color);
          return (
            productColors.includes(color) ||
            productColors.some((productColor: any) => productColor === color)
          );
        });
      });
    }

    // Apply size filter
    if (sizesQuery.length > 0) {
      filtered = filtered.filter((product) => {
        const productSizes = (product.sizes || []).map((size) =>
          typeof size === "string" ? size : size.name
        );
        return sizesQuery.some((sizeQuery) =>
          productSizes.some((productSize) => productSize.toLowerCase() === sizeQuery.toLowerCase())
        );
      });
    }

    // Apply price range filter
    filtered = filtered.filter(
      (product) => product.price >= priceRange.min && product.price <= priceRange.max
    );

    // Apply sorting
    switch (sortBy) {
      case "price-low-high":
        filtered.sort((a, b) => a.price - b.price);
        break;
      case "price-high-low":
        filtered.sort((a, b) => b.price - a.price);
        break;
      case "newest":
        filtered.sort(
          (a, b) => new Date(a?.createdAt).getTime() - new Date(b?.createdAt).getTime()
        );
        break;
      // case "bestselling":
      //   filtered.sort((a, b) => (b.sold || 0) - (a.sold || 0));
      //   break;
      default: // "featured" or any other value
        // Keep default sorting or apply featured logic
        filtered.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
        break;
    }

    setFilteredProducts(filtered);
  }, [products, searchQuery, categoryQuery, colorsQuery, sizesQuery, priceRange, sortBy]);

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

  const handleClearFilters = () => {
    setInitialFilterState({
      limit,
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
    setCategoryQuery("");
    setPriceRange({ min: 0, max: 1000 });
    setSortBy("featured");
    setPage(1);
    navigate("/collections", { replace: true });
  };

  const displayProducts = filteredProducts?.length > 0 ? filteredProducts : products;

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
          categoryQuery={categoryQuery}
          searchQuery={searchQuery}
          setCategoryQuery={setCategoryQuery}
          setInitialFilterState={setInitialFilterState}
          setPage={setPage}
          setPriceRange={setPriceRange}
          setSortBy={setSortBy}
          priceRange={priceRange}
        />
        <div
          className={classNames(
            "w-full absolute justify-between left-0 right-0 lg:left-[24rem] lg:w-[calc(100%-24rem)] px-4 xl:px-0 xl:pl-4"
          )}
        >
          {/* Display the number of products and active filters */}
          <div className="mt-4 flex flex-wrap gap-2 items-center justify-between">
            <div className="text-sm font-medium text-gray-700">
              Showing {displayProducts?.length}{" "}
              {displayProducts?.length === 1 ? "product" : "products"}
            </div>
            {/* Active filters display */}
            {(colorsQuery?.length > 0 || sizesQuery?.length > 0 || searchQuery) && (
              <div className="mt-4 flex flex-wrap gap-2 items-center">
                <span className="text-sm font-medium text-gray-700">Active filters:</span>

                {searchQuery && (
                  <span className="inline-flex items-center rounded-full bg-indigo-100 px-3 py-0.5 text-sm font-medium text-indigo-800">
                    Search: {searchQuery}
                    <button
                      onClick={() => setSearchQuery("")}
                      className="ml-1 text-indigo-500 hover:text-indigo-800"
                    >
                      <XMarkIcon className="h-4" aria-hidden={true} />
                    </button>
                  </span>
                )}

                {colorsQuery?.length > 0 && (
                  <span className="inline-flex items-center rounded-full bg-blue-100 px-3 py-0.5 text-sm font-medium text-blue-800">
                    Colors: {colorsQuery.join(", ")}
                    <button
                      onClick={() => setColorsQuery([])}
                      className="ml-1 text-indigo-500 hover:text-indigo-800"
                    >
                      <XMarkIcon className="h-4" aria-hidden={true} />
                    </button>
                  </span>
                )}

                {sizesQuery?.length > 0 && (
                  <span className="inline-flex items-center rounded-full bg-green-100 px-3 py-0.5 text-sm font-medium text-green-800">
                    Sizes: {sizesQuery?.join(", ")}
                    <button
                      onClick={() => setSizesQuery([])}
                      className="ml-1 text-indigo-500 hover:text-indigo-800"
                    >
                      <XMarkIcon className="h-4" aria-hidden={true} />
                    </button>
                  </span>
                )}

                <button
                  onClick={handleClearFilters}
                  className="text-sm text-red-600 hover:text-red-800"
                >
                  Clear all
                </button>
              </div>
            )}
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
            ) : searchQuery && displayProducts?.length === 0 ? (
              <div className="col-span-full py-10 text-center">
                <p className="font-medium text-gray-700 text-lg">
                  No products found for "{searchQuery}"
                </p>
                <button
                  onClick={handleClearFilters}
                  className="mt-2 text-indigo-600 hover:text-indigo-800"
                >
                  Clear search and filters
                </button>
              </div>
            ) : displayProducts?.length === 0 ? (
              <ProductsSkeletonLoading cardsNumber={8} />
            ) : (
              displayProducts?.map((product: ProductType) => (
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
          {!isLoading && displayProducts?.length > 0 && totalPages > 1 && (
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
