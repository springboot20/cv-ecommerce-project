import Skeleton from "react-loading-skeleton";
import { motion } from "framer-motion";

export const ProductsSkeletonLoading = ({ cardsNumber }: { cardsNumber: number }) => {
  return Array(cardsNumber)
    .fill("-")
    .map((_, indx) => {
      return (
        <motion.div layout key={indx} className="h-[16rem]">
          <header className="h-52 w-full relative rounded-xl overflow-hidden">
            <Skeleton
              height={"100%"}
              style={{ position: "absolute", objectFit: "cover" }}
              borderRadius={0}
              className="border border-gray-300"
            />
          </header>
          <div className="relative flex items-center justify-between gap-1.5 mt-2">
            <h3 className="w-32 relative">
              <Skeleton
                className="border border-gray-300 h-6"
                containerClassName="w-full absolute"
              />
            </h3>
            <p className="w-32 relative">
              <Skeleton
                className="border border-gray-300 h-6"
                containerClassName="w-full absolute"
              />
            </p>
          </div>
        </motion.div>
      );
    });
};
