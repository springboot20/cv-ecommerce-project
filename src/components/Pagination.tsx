import { ArrowLeftIcon, ArrowRightIcon } from '@heroicons/react/24/outline'

export const Pagination: React.FC<{
  itemsPerPage: number
  totalItems: number | undefined
  currentPage: number
  onPageChange: React.Dispatch<React.SetStateAction<number>>
}> = ({ itemsPerPage, totalItems, currentPage, onPageChange }) => {
  const totalPages = Math.ceil(totalItems! / itemsPerPage)

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      onPageChange(page)
    }
  }
  return (
    <div className="z-40 fixed bottom-7 left-2/4 rounded-lg bg-white dark:bg-dark-blue-dark-DME mx-auto -translate-x-2/4">
      <div className="flex items-center lg:px-4 py-2 rounded-md gap-[0.15rem] lg:gap-9">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          className={
            'flex items-center gap-5 p-2 cursor-pointer mr-4'
          }
        >
          <ArrowLeftIcon
            className={
              'h-6 text-dark-blue-dark-LMT hidden md:block dark:text-white'
            }
          />
          <span className="text-md md:text-xl font-semibold block dark:text-white">
            Previous
          </span>
        </button>
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index}
            onClick={() => handlePageChange(index + 1)}
            className={`p-[0.30rem] sm:p-[0.55rem] lg:p-3 h-full block font-semibold text-lg cursor-pointer rounded-md transition-all ${
              currentPage === index + 1
                ? 'text-blue-700 bg-gray-300'
                : 'text-gray-500 dark:text-white'
            }`}
          >
            {index + 1}
          </button>
        ))}
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          className={
            'flex items-center gap-3 p-2 cursor-pointer'
          }
        >
          <span className="text-md md:text-xl font-semibold block dark:text-white">
            Next
          </span>
          <ArrowRightIcon
            className={
              'h-6 text-dark-blue-dark-LMT dark:text-white hidden md:block'
            }
          />
        </button>
      </div>
    </div>
  )
}
