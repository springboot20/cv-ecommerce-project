import { Fragment, useState } from 'react';
import { classNames } from '../../helpers';
import { motion } from 'framer-motion';
import { Pagination } from '../../components/Pagination';
import { gridVariants } from '../../util/framerMotion.config';
import { useGetAllProductsQuery } from '../../features/products/product.slice';
import { ProductCategory, ProductType } from '../../types/redux/product';
import { ProductsSkeletonLoading } from '../../components/loaders/Skeleton';
import { CategoryPanel } from '../../components/panels/CategoryPanel';
import { Disclosure } from '@headlessui/react';
import { Bars3Icon } from '@heroicons/react/24/outline';
import { LocalStorage } from '../../util';
import { useGetAllCategoryQuery } from '../../features/category/category.slice';
import ProductPreviewModal from '../../components/modal/PreviewProductModal';
import { Product } from './Product';

const Products = () => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  // const [featured, setFeatured] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);
  const [openPreview, setOpenPreview] = useState<{ [key: string]: boolean }>({});
  // const [categoryQuery, setCategoryQuery] = useState<string>("");

  const limit = 10;

  const { data: categoriedData } = useGetAllCategoryQuery();
  const { data, isLoading } = useGetAllProductsQuery({
    limit,
    page,
    featured: false,
    name: searchQuery,
  });

  const categories = categoriedData?.data.categories as ProductCategory[];

  const products = data?.data?.products ?? (LocalStorage.get('products') as ProductType[]);

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

  const handlePreviewOpen = (id: string) => setOpenPreview((prev) => ({ ...prev, [id]: true }));
  const handlePreviewClose = (id: string) => setOpenPreview((prev) => ({ ...prev, [id]: false }));

  return (
    <Disclosure>
      <section className='relative flex items-stretch justify-between flex-shrink-0'>
        <CategoryPanel handleSearch={handleSearch} categories={categories} />
        <div
          className={classNames(
            isLoading ? 'h-auto' : 'h-auto',
            'w-full absolute justify-between left-0 right-0 lg:left-[24rem] lg:w-[calc(100%-24rem)] px-4 xl:px-0 xl:pl-4'
          )}>
          <div className='lg:hidden'>
            <Disclosure.Button>
              <span className='sr-only'>Open side panel</span>
              <Bars3Icon className='h-6' aria-hidden={true} />
            </Disclosure.Button>
          </div>
          <motion.div
            layout
            initial='hidden'
            animate='visible'
            variants={gridVariants}
            className='grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 gap-5 mt-4'>
            {isLoading ? (
              <ProductsSkeletonLoading cardsNumber={6} />
            ) : searchQuery && products?.length === 0 ? (
              <p className='font-medium text-gray-700 text-lg text-center'>
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
