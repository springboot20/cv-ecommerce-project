import { Fragment, useCallback, useEffect, useState } from "react";
import { formatPrice } from "../../../../helpers";
import { motion } from "framer-motion";
import { Pagination } from "../../../../components/Pagination";
import { gridVariants } from "../../../../util/framerMotion.config";
import { toast } from "react-toastify";
import {
  useDeleteProductMutation,
  useGetAllProductsQuery,
} from "../../../../features/products/product.slice";
import { ProductType } from "../../../../types/redux/product";
import { ProductsSkeletonLoading } from "../../../../components/loaders/Skeleton";
import { clx } from "../../../../util";
import {
  MagnifyingGlassIcon,
  PencilIcon,
  TrashIcon,
  XCircleIcon,
} from "@heroicons/react/24/outline";
import { Button } from "@material-tailwind/react";
import { Dialog, Transition } from "@headlessui/react";
import { useNavigate } from "react-router-dom";

const AdminProducts = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [page, setPage] = useState<number>(1);
  const [open, setOpen] = useState<{ [key: string]: boolean }>({});
  const [deleteProduct, { isLoading: deleteProductLoading }] = useDeleteProductMutation();
  const [productDeleted, setProductDeleted] = useState<boolean>(false);

  let limit = 10;
  const { data, isLoading, refetch } = useGetAllProductsQuery({
    limit,
    page,
    featured: false,
    name: searchQuery,
  });

  let response: ProductType[] = data?.data?.products;
  let products = Array.isArray(response) ? response : [response];

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

  const onOpen = (id: string) => setOpen((prev) => ({ ...prev, [id]: true }));
  const onClose = (id: string) => setOpen((prev) => ({ ...prev, [id]: false }));

  useEffect(() => {
    if (data?.message) {
      toast.success(data?.message);
    }

    if (productDeleted) {
      refetch();
    }
  }, [data?.message]);

  const handleProductDelete = useCallback(
    async (productId: string) => {
      await deleteProduct(productId)
        .unwrap()
        .then((response) => {
          console.log(response.data);
          setProductDeleted(true);
          toast.success(response.message);
        })
        .catch((error: any) => {
          console.log(error);
          if (error) {
            toast.error(error.error);
            toast.error(error.data.message);
          }
          setProductDeleted(true);
        });
    },
    [deleteProduct],
  );

  return (
    <Fragment>
      <section className={clx("max-w-6xl mx-auto", isLoading && "h-auto")}>
        <div className="relative mt-8 w-full lg:w-[20rem]">
          <MagnifyingGlassIcon
            className={`eye-icon absolute top-[50%] translate-y-[-50%] left-4 cursor-pointer text-xl text-gray-700`}
          />
          <input
            id="password"
            name="search"
            type="text"
            placeholder="search for product here..."
            autoComplete="password"
            onChange={handleSearch}
            className={`block w-full rounded-md border-0 py-3 pl-11 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-600 text-base font-base sm:leading-6 `}
          />
        </div>
        <motion.div
          layout
          initial="hidden"
          animate="visible"
          variants={gridVariants}
          className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 gap-5 mt-4"
        >
          {isLoading ? (
            <ProductsSkeletonLoading cardsNumber={9} />
          ) : searchQuery && products.length === 0 ? (
            <p className="font-semibold text-gray-700 text-xl text-center">
              No country found for "{searchQuery}"
            </p>
          ) : (
            products?.map((product: ProductType) => (
              <Fragment key={product._id}>
                <DeleteModal
                  open={!!open[product._id]}
                  onClose={() => onClose(product._id)}
                  handleDelete={() => handleProductDelete(product._id)}
                  deleteProductLoading={deleteProductLoading}
                  productDeleted={productDeleted}
                />

                <motion.div layout>
                  <header className=" transition-all h-52 w-full relative rounded-xl overflow-hidden border">
                    <img
                      src={product?.imageSrc.url}
                      alt=""
                      className="h-full absolute object-cover object-center w-full transition"
                    />
                  </header>
                  <div className="p-2 space-y-3">
                    <div className="relative flex pt-2 justify-between gap-1.5">
                      <h3 className="capitalize text-lg font-medium text-gray-700">
                        {product.name}
                      </h3>
                      <p className="text-lg font-medium">{formatPrice(product.price)}</p>
                    </div>
                    <div className="flex items-center justify-between">
                      <Button
                        onClick={() => onOpen(product._id)}
                        variant="outlined"
                        color="red"
                        className="flex items-center gap-2 rounded px-2"
                        placeholder={undefined}
                        onPointerEnterCapture={undefined}
                        onPointerLeaveCapture={undefined}
                      >
                        <TrashIcon className="h-5 w-5" />
                        <span>delete product</span>
                      </Button>

                      <Button
                        variant="outlined"
                        color="indigo"
                        onClick={() => {
                          navigate(`/admin/products/edit/${product._id}`);
                        }}
                        className="flex items-center gap-2 rounded px-2"
                        placeholder={undefined}
                        onPointerEnterCapture={undefined}
                        onPointerLeaveCapture={undefined}
                      >
                        <PencilIcon className="h-5 w-5" />
                        <span>edit product</span>
                      </Button>
                    </div>
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
          hasPrevPage={hasPrevPage}
          handlePreviousPage={handlePreviousPage}
          handleNextPage={handleNextPage}
        />
      </section>
    </Fragment>
  );
};

export default AdminProducts;

const DeleteModal: React.FC<{
  open: boolean;
  onClose: () => void;
  handleDelete: () => Promise<void>;
  deleteProductLoading: boolean;
  productDeleted: boolean;
}> = ({ open, onClose, handleDelete, deleteProductLoading, productDeleted }) => {
  return (
    <Transition show={open} as={Fragment}>
      <Dialog open={open} onClose={onClose} className="w-full relative z-30 " as="div">
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <Dialog.Backdrop className="fixed inset-0 z-10 bg-gray-500 bg-opacity-75 transition-opacity duration-500 ease-in-out data-[closed]:opacity-0" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-hidden">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <div className="absolute inset-0 overflow-hidden">
              <div className="flex h-screen items-center justify-center">
                <Dialog.Panel className="bg-white relative max-w-md w-full flex flex-col space-y-2 p-4">
                  <button
                    onClick={onClose}
                    className="h-12 w-12 flex items-center justify-center absolute top-0 right-0"
                  >
                    <span className="sr-only">Close modal</span>
                    <XCircleIcon className="h-5 text-[#758E95]" strokeWidth={2.5} />
                  </button>
                  <Dialog.Title as="h1" className="text-xl font-bold text-red-500">
                    Delete Product
                  </Dialog.Title>
                  <div className="text-center">
                    <Dialog.Title as="h3" className="font-normal text-base text-red-500">
                      Are you sure you want to delete this product?
                    </Dialog.Title>
                    <Dialog.Description className="mt-3 text-[#413F3F] font-normal text-sm sm:text-base">
                      Deleting this product means it will be permanently removed from products
                      collections and cannot be recovered
                    </Dialog.Description>
                  </div>

                  <div className="flex items-center justify-between">
                    <Button
                      variant="filled"
                      color="red"
                      disabled={deleteProductLoading}
                      onClick={async () => {
                        await handleDelete();
                        if (productDeleted) {
                          setTimeout(() => onClose(), 2000);
                        }
                      }}
                      className="flex items-center gap-2 rounded px-2"
                      placeholder={undefined}
                      onPointerEnterCapture={undefined}
                      onPointerLeaveCapture={undefined}
                    >
                      {deleteProductLoading ? (
                        <span>deleting product...</span>
                      ) : (
                        <>
                          <TrashIcon className="h-5 w-5 text-white" />
                          <span>delete product</span>
                        </>
                      )}
                    </Button>

                    <Button
                      variant="filled"
                      color="indigo"
                      onClick={onClose}
                      className="flex items-center gap-2 rounded px-2"
                      placeholder={undefined}
                      onPointerEnterCapture={undefined}
                      onPointerLeaveCapture={undefined}
                    >
                      <XCircleIcon className="h-5 w-5" />
                      <span>cancel delete</span>
                    </Button>
                  </div>
                </Dialog.Panel>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
};
