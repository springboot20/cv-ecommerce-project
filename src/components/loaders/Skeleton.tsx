import Skeleton from "react-loading-skeleton";
import { motion } from "framer-motion";
import { Fragment } from "react";

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
            <h3 className="w-28 relative">
              <Skeleton
                className="border border-gray-300 h-6"
                containerClassName="w-full"
              />
            </h3>
            <p className="w-20 relative">
              <Skeleton
                className="border border-gray-300 h-6"
                containerClassName="w-full"
              />
            </p>
          </div>
        </motion.div>
      );
    });
};

export const ProductSkeletonLoading = () => {
  return (
    <Fragment>

      <div className="h-[30rem] col-span-full lg:col-span-1 flex items-start gap-2 w-full">
        <header className="h-full w-full relative rounded-xl overflow-hidden">
          <Skeleton
            height={"100%"}
            style={{ position: "absolute", objectFit: "cover" }}
            borderRadius={0}
            className="border border-gray-300"
          />
        </header>
      </div>
      <div className="col-span-full lg:col-span-1 w-full">
        <div>
          <div className="flex items-center justify-between w-full">
            <h3 className="w-52 relative">
              <Skeleton className="border border-gray-300 h-7" containerClassName="w-full" />
            </h3>
            <p className="w-28 relative">
              <Skeleton className="border border-gray-300 h-7" containerClassName="w-full" />
            </p>
          </div>
          <div className="flex items-center gap-1 mt-1">
            <span className="relative w-28">
              <Skeleton className="border border-gray-300 h-7" containerClassName="w-full" />
            </span>
          </div>
        </div>

        <div className="flex flex-col gap-2 mt-10">
          <h1 className="relative w-32">
            <Skeleton className="border border-gray-300 h-7" containerClassName="w-full" />
          </h1>
          <div className="flex items-start gap-2">
            <span className="relative h-10 w-10">
              <Skeleton borderRadius={"50%"} className="border h-full w-full border-gray-300" />
            </span>
            <span className="relative h-10 w-10">
              <Skeleton borderRadius={"50%"} className="border h-full w-full border-gray-300" />
            </span>
          </div>
        </div>

        <div className="flex flex-col gap-2 mt-10">
          <h1 className="relative w-32">
            <Skeleton className="border border-gray-300 h-7" containerClassName="w-full" />
          </h1>
          <div className="grid grid-cols-6 gap-2">
            <span className="relative h-11 w-auto">
              <Skeleton className="border h-full w-full border-gray-300" />
            </span>
            <span className="relative h-11 w-auto">
              <Skeleton className="border h-full w-full border-gray-300" />
            </span>
            <span className="relative h-11 w-auto">
              <Skeleton className="border h-full w-full border-gray-300" />
            </span>
            <span className="relative h-11 w-auto">
              <Skeleton className="border h-full w-full border-gray-300" />
            </span>
            <span className="relative h-11 w-auto">
              <Skeleton className="border h-full w-full border-gray-300" />
            </span>
            <span className="relative h-11 w-auto">
              <Skeleton className="border h-full w-full border-gray-300" />
            </span>
          </div>
        </div>

        <div className="col-span-full mt-10">
          <span className="block h-14 relative">
            <Skeleton className="border h-full w-full border-gray-300" />
          </span>
        </div>

        <div className="flex flex-col gap-2 mt-10">
          <h1 className="relative w-32">
            <Skeleton className="border border-gray-300 h-7" containerClassName="w-full " />
          </h1>
          <div className="space-y-3">
            <p className="relative h-6 w-auto">
              <Skeleton className="border h-full w-full border-gray-300 mt-1.5" count={3.5} />
            </p>
          </div>
        </div>
      </div>
    </Fragment>
  );
};
