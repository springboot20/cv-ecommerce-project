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
    <div className="sticky top-full rounded-lg bg-white mx-auto">
      <div className="flex items-center justify-center rounded-md gap-4">
        <Button
          variant="text"
          className="flex items-center gap-2"
          onClick={handlePreviousPage}
          disabled={!hasPrevPage}
        >
          <ArrowLeftIcon strokeWidth={2} className="h-4 w-4" /> Previous
        </Button>
        <span>
          Page {page} of {totalPages}
        </span>
        <Button
          variant="text"
          className="flex items-center gap-2"
          onClick={handleNextPage}
          disabled={!hasNextPage}
        >
          Next <ArrowRightIcon strokeWidth={2} className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};
