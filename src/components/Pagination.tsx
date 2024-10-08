import React from "react";
import { Button } from "@material-tailwind/react";
import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/24/outline";

export const Pagination: React.FC<{
  page: number;
  totalPages: number;
  hasPrevPage: boolean;
  hasNextPage: boolean;
  handleNextPage: () => void;
  handlePreviousPage: () => void;
}> = ({ page, handleNextPage, handlePreviousPage, totalPages, hasNextPage, hasPrevPage }) => {
  return (
    <div className="sticky top-full mb-2">
      <div className="flex items-center justify-center max-w-sm mx-auto gap-4 rounded-lg bg-white border">
        <Button
          variant="text"
          className="flex items-center gap-2 leading-[0]"
          onClick={handlePreviousPage}
          disabled={!hasPrevPage}
        >
          <ArrowLeftIcon strokeWidth={2} className="h-4 w-4" />
          <span>Previous</span>
        </Button>
        <span>
          Page {page} of {totalPages}
        </span>
        <Button
          variant="text"
          className="flex items-center gap-2 leading-[0]"
          onClick={handleNextPage}
          disabled={!hasNextPage}
        >
          <span>Next</span>
          <ArrowRightIcon strokeWidth={2} className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};
