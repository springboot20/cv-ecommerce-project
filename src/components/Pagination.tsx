import { Button, ButtonGroup } from '@material-tailwind/react';

export const Pagination: React.FC<{
  itemsPerPage: number;
  totalItems: number | undefined;
  currentPage: number;
  onPageChange: React.Dispatch<React.SetStateAction<number>>;
}> = ({ itemsPerPage, totalItems, currentPage, onPageChange }) => {
  const totalPages = Math.ceil(totalItems! / itemsPerPage);

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      onPageChange(page);
    }
  };
  return (
    <div className='py-12 rounded-lg dark:bg-dark-blue-dark-DME mx-auto flex justify-center'>
      <div className='flex items-center lg:px-4 py-2 rounded-md gap-[0.15rem] lg:gap-4'>
        <ButtonGroup
          onClick={() => handlePageChange(currentPage - 1)}
          variant="text"
          className={
            'flex items-center space-x-3 border-r-[1px] border-gray-900/75 p-2 cursor-pointer lowercase'
          }>
          <span className='text-md md:text-xl font-semibold block dark:text-white'>prev</span>
        </ButtonGroup>
        {Array.from({ length: totalPages }, (_, index) => (
          <Button
            key={index}
            onClick={() => handlePageChange(index + 1)}
            className={`p-[0.30rem] sm:p-[0.55rem] lg:p-3 h-full block font-semibold text-lg cursor-pointer rounded-md transition-all ${
              currentPage === index + 1
                ? 'text-blue-700 bg-gray-300'
                : 'text-gray-500 dark:text-white'
            }`}>
            {index + 1}
          </Button>
        ))}
        <ButtonGroup
          onClick={() => handlePageChange(currentPage + 1)}
          variant="text"
          className={
            'flex items-center space-x-3 border-l-[1px] border-gray-900/75 p-2 cursor-pointer lowercase'
          }>
          <span className='text-md md:text-xl font-semibold block dark:text-white'>next</span>
        </ButtonGroup>
      </div>
    </div>
  );
};
