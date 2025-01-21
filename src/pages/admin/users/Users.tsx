import { TrashIcon } from '@heroicons/react/24/outline';
import { PencilIcon } from '@heroicons/react/24/solid';
import {
  Card,
  Typography,
  Button,
  CardBody,
  Chip,
  CardFooter,
  Avatar,
  IconButton,
  Tooltip,
  Checkbox,
} from '@material-tailwind/react';
import { useDeleteUserMutation, useGetAllUsersQuery } from '../../../features/users/users.slice';
import { useCallback, useEffect, useState } from 'react';
import { User } from '../../../types/redux/auth';
import { toast } from 'react-toastify';

export default function Users() {
  const limit = 10;

  const [page, setPage] = useState<number>(1);
  const { data, refetch, isLoading } = useGetAllUsersQuery({
    limit,
    page,
  });
  const [deleteUser] = useDeleteUserMutation();

  const users = data?.data?.users as User[];

  const selectedHeaders = ['_id', 'username', 'email', 'role', 'createdAt'];

  const columns =
    users?.length > 0 ? Object.keys(users[0]).filter((key) => selectedHeaders.includes(key)) : [];

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

  useEffect(() => {
    if (data?.message) {
      toast.success(data?.message);
    }
    refetch();
  }, [data?.message, refetch, page, limit, totalPages]);

  const handleUserDelete = useCallback(
    async (userId: string) => {
      try {
        const response = await deleteUser(userId).unwrap();
        const data = await response.data;

        toast(response.message, {
          type: 'success',
        });

        return data;
      } catch (error: any) {
        toast.error(error.data.message);
        toast.error(error.error);
      }
    },
    [deleteUser]
  );

  return (
    <div className='mx-auto max-w-6xl mt-4'>
      <Card
        className='h-full w-full !rounded !shadow'
        placeholder={undefined}
        onPointerEnterCapture={undefined}
        onPointerLeaveCapture={undefined}>
        <CardBody
          className='overflow-x-auto p-0'
          placeholder={undefined}
          onPointerEnterCapture={undefined}
          onPointerLeaveCapture={undefined}>
          {(users || []).length || isLoading ? (
            <table className='w-full min-w-max table-auto text-left'>
              <>
                <thead>
                  <tr>
                    {[...columns, 'Action'].map((column: string) => {
                      const formattedText =
                        column.charAt(0).toUpperCase() +
                        column.slice(1, column.length).toLowerCase();
                      return (
                        <th
                          key={column}
                          className='border-y border-blue-gray-100 bg-blue-gray-50/50 p-4'>
                          <div className='flex items-center space-x-3'>
                            {formattedText === '_id' && (
                              <Checkbox
                                crossOrigin={undefined}
                                onPointerEnterCapture={undefined}
                                onPointerLeaveCapture={undefined}
                              />
                            )}
                            <Typography
                              variant='small'
                              color='blue-gray'
                              className='leading-none opacity-70 font-medium'
                              placeholder={undefined}
                              onPointerEnterCapture={undefined}
                              onPointerLeaveCapture={undefined}>
                              {formattedText === '_id'
                                ? formattedText.split('_')[1]
                                : formattedText}
                            </Typography>
                          </div>
                        </th>
                      );
                    })}
                  </tr>
                </thead>
                <tbody>
                  {users?.map((d: any, index: number) => {
                    const isLast = index === users.length - 1;
                    const classes = isLast ? 'p-4' : 'p-4 border-b border-blue-gray-50';

                    const date = new Date(d.createdAt);
                    const formattedDate = `${date.getDate()}/${
                      date.getMonth() > 9 ? date.getMonth() : date.getMonth()
                    }/${date.getFullYear()}`;

                    return (
                      <tr key={d._id}>
                        <td className={classes}>
                          <div className='flex items-center space-x-3'>
                            <Checkbox
                              crossOrigin={undefined}
                              onPointerEnterCapture={undefined}
                              onPointerLeaveCapture={undefined}
                            />
                            <Typography
                              variant='small'
                              color='blue-gray'
                              className='font-normal opacity-70'
                              placeholder={undefined}
                              onPointerEnterCapture={undefined}
                              onPointerLeaveCapture={undefined}>
                              {d._id}
                            </Typography>
                          </div>
                        </td>

                        <td className={classes}>
                          <div className='flex items-center gap-3'>
                            <Avatar
                              src={d.avatar?.url}
                              alt={d.username}
                              size='sm'
                              placeholder={undefined}
                              onPointerEnterCapture={undefined}
                              onPointerLeaveCapture={undefined}
                            />
                            <Typography
                              variant='small'
                              color='blue-gray'
                              className='font-normal'
                              placeholder={undefined}
                              onPointerEnterCapture={undefined}
                              onPointerLeaveCapture={undefined}>
                              {d.username}
                            </Typography>
                          </div>
                        </td>

                        <td className={classes}>
                          <Typography
                            variant='small'
                            color='blue-gray'
                            className='font-normal opacity-70'
                            placeholder={undefined}
                            onPointerEnterCapture={undefined}
                            onPointerLeaveCapture={undefined}>
                            {d.email}
                          </Typography>
                        </td>

                        <td className={classes}>
                          <div className='w-max'>
                            <Chip
                              variant='ghost'
                              size='sm'
                              value={d.role}
                              color={d.role === 'ADMIN' ? 'green' : 'blue-gray'}
                            />
                          </div>
                        </td>

                        <td className={classes}>
                          <Typography
                            variant='small'
                            color='blue-gray'
                            className='font-normal'
                            placeholder={undefined}
                            onPointerEnterCapture={undefined}
                            onPointerLeaveCapture={undefined}>
                            {formattedDate}
                          </Typography>
                        </td>

                        <td className={classes}>
                          <div className='flex space-x-5 items-center'>
                            <Tooltip content='Delete User' className='bg-gray-600'>
                              <IconButton
                                variant='text'
                                onClick={() => handleUserDelete(d._id)}
                                placeholder={undefined}
                                onPointerEnterCapture={undefined}
                                onPointerLeaveCapture={undefined}>
                                <TrashIcon className='h-5 w-5 text-red-500' />
                              </IconButton>
                            </Tooltip>

                            <Tooltip content='Edit User' className='bg-gray-600'>
                              <IconButton
                                variant='text'
                                placeholder={undefined}
                                onPointerEnterCapture={undefined}
                                onPointerLeaveCapture={undefined}>
                                <PencilIcon className='h-5 w-5' />
                              </IconButton>
                            </Tooltip>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </>
            </table>
          ) : (
            <div className='flex items-center justify-center p-4 bg-gray-50'>
              <svg className='h-7 w-7 animate-spin' viewBox='3 3 18 18'>
                <path
                  className='fill-gray-300'
                  d='M12 5C8.13401 5 5 8.13401 5 12C5 15.866 8.13401 19 12 19C15.866 19 19 15.866 19 12C19 8.13401 15.866 5 12 5ZM3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12Z'></path>
                <path
                  className='fill-secondary'
                  d='M16.9497 7.05015C14.2161 4.31648 9.78392 4.31648 7.05025 7.05015C6.65973 7.44067 6.02656 7.44067 5.63604 7.05015C5.24551 6.65962 5.24551 6.02646 5.63604 5.63593C9.15076 2.12121 14.8492 2.12121 18.364 5.63593C18.7545 6.02646 18.7545 6.65962 18.364 7.05015C17.9734 7.44067 17.3403 7.44067 16.9497 7.05015Z'></path>
              </svg>
              <span className='ml-2'>users loading...</span>
            </div>
          )}
        </CardBody>
        <CardFooter
          className='flex items-center justify-between border-t border-blue-gray-50 p-4'
          placeholder={undefined}
          onPointerEnterCapture={undefined}
          onPointerLeaveCapture={undefined}>
          <Typography
            variant='small'
            color='blue-gray'
            className='font-normal'
            placeholder={undefined}
            onPointerEnterCapture={undefined}
            onPointerLeaveCapture={undefined}>
            Page {page} of {totalPages}
          </Typography>
          <div className='flex gap-2'>
            <Button
              variant='outlined'
              size='sm'
              onClick={handlePreviousPage}
              disabled={page === 1}
              className='rounded'
              placeholder={undefined}
              onPointerEnterCapture={undefined}
              onPointerLeaveCapture={undefined}>
              Previous
            </Button>
            <Button
              variant='outlined'
              size='sm'
              onClick={handleNextPage}
              className='rounded'
              disabled={!hasNextPage}
              placeholder={undefined}
              onPointerEnterCapture={undefined}
              onPointerLeaveCapture={undefined}>
              Next
            </Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
