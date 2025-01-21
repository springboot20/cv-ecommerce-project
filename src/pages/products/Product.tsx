import { motion } from "framer-motion";
import { ProductType } from "../../types/redux/product";
import { EyeIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";
import { formatPrice } from "../../helpers";
import Skeleton from "react-loading-skeleton";

export const Product: React.FC<{
  product: ProductType;
  handlePreviewOpen: (id: string) => void;
}> = ({ product, handlePreviewOpen }) => {
  return (
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
        <p className="text-base text-gray-700 font-medium">{formatPrice(product?.price)}</p>
      </div>
    </motion.div>
  );
};
