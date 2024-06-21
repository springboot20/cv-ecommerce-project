import React from 'react'
import { Button, IconButton, IconButtonProps } from '@material-tailwind/react'
import { ArrowLeftIcon, ArrowRightIcon } from '@heroicons/react/24/outline'

export const Pagination: React.FC<{
  itemsPerPage: number
  totalItems: number | undefined
  currentPage: number
  onPageChange: React.Dispatch<React.SetStateAction<number>>
}> = ({ itemsPerPage, totalItems, currentPage, onPageChange }) => {
  const totalPages = Math.ceil((totalItems || 0) / itemsPerPage)

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      onPageChange(page)
    }
  }

  const getItemProps = (index: number) => ({
    variant:
      currentPage === index ? 'filled' : ('text' as IconButtonProps['variant']),
    color: 'gray' as IconButtonProps['color'],
    onClick: () => handlePageChange(index),
    children: index + 1,
  })

  const next = () => {
    if (currentPage < totalPages) {
      handlePageChange(currentPage + 1)
    }
  }

  const prev = () => {
    if (currentPage > 1) {
      handlePageChange(currentPage - 1)
    }
  }

  return (
    <div className="absolute my-10 left-2/4 rounded-lg bg-white dark:bg-dark-blue-dark-DME mx-auto -translate-x-2/4">
      <div className="flex items-center lg:px-4 py-2 rounded-md gap-4">
        <Button
          variant="text"
          className="flex items-center gap-2"
          onClick={prev}
          disabled={currentPage === 1}
        >
          <ArrowLeftIcon strokeWidth={2} className="h-4 w-4" /> Previous
        </Button>
        <div className="flex items-center gap-2">
          {Array.from({ length: totalPages }, (_, index) => (
            <IconButton key={index} {...getItemProps(index + 1)}>
              {index + 1}
            </IconButton>
          ))}
        </div>
        <Button
          variant="text"
          className="flex items-center gap-2"
          onClick={next}
          disabled={currentPage === totalPages}
        >
          Next <ArrowRightIcon strokeWidth={2} className="h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}
