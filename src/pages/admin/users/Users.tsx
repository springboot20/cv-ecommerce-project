import { TrashIcon } from "@heroicons/react/24/outline";
import { PencilIcon } from "@heroicons/react/24/solid";
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
} from "@material-tailwind/react";
import { useDeleteUserMutation, useGetAllUsersQuery } from "../../../features/users/users.slice";
import { useCallback, useEffect, useState } from "react";
import { User } from "../../../types/redux/auth";
import { toast } from "react-toastify";

export default function Users() {
  let limit = 10;

  const [page, setPage] = useState<number>(1);
  const { data, refetch } = useGetAllUsersQuery({
    limit,
    page,
  });
  const [deleteUser] = useDeleteUserMutation();

  const users = data?.data?.users as User[];

  const selectedHeaders = ["_id", "username", "email", "role", "createdAt"];

  const columns =
    users?.length > 0 ? Object.keys(users[0]).filter((key) => selectedHeaders.includes(key)) : [];

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

  useEffect(() => {
    if (data?.message) {
      toast.success(data?.message);
    }
    refetch();
  }, [data?.message]);

  const handleUserDelete = useCallback(
    async (userId: string) => {
      try {
        const response = await deleteUser(userId).unwrap();
        const data = await response.data;

        toast(response.message, {
          type: "success",
        });

        return data;
      } catch (error: any) {
        toast.error(error.data.message);
        toast.error(error.error);
      }
    },
    [deleteUser],
  );

  return (
    <div className="mx-auto max-w-6xl mt-4">
      <Card className="h-full w-full !rounded !shadow">
        <CardBody className="overflow-x-auto p-0">
          <table className="w-full min-w-max table-auto text-left">
            <thead>
              <tr>
                {[...columns, "Action"].map((column: string) => {
                  let formattedText =
                    column.charAt(0).toUpperCase() + column.slice(1, column.length).toLowerCase();
                  return (
                    <th
                      key={column}
                      className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4"
                    >
                      <div className="flex items-center space-x-3">
                        {formattedText === "_id" && <Checkbox crossOrigin={undefined} />}
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="leading-none opacity-70 font-medium"
                        >
                          {formattedText === "_id" ? formattedText.split("_")[1] : formattedText}
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
                const classes = isLast ? "p-4" : "p-4 border-b border-blue-gray-50";

                let date = new Date(d.createdAt);
                const formattedDate = `${date.getDate()}/${
                  date.getMonth() > 9 ? date.getMonth() : date.getMonth()
                }/${date.getFullYear()}`;

                return (
                  <tr key={d._id}>
                    <td className={classes}>
                      <div className="flex items-center space-x-3">
                        <Checkbox crossOrigin={undefined} />
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal opacity-70"
                        >
                          {d._id}
                        </Typography>
                      </div>
                    </td>

                    <td className={classes}>
                      <div className="flex items-center gap-3">
                        <Avatar src={d.avatar?.url} alt={d.username} size="sm" />
                        <Typography variant="small" color="blue-gray" className="font-normal">
                          {d.username}
                        </Typography>
                      </div>
                    </td>

                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal opacity-70"
                      >
                        {d.email}
                      </Typography>
                    </td>

                    <td className={classes}>
                      <div className="w-max">
                        <Chip
                          variant="ghost"
                          size="sm"
                          value={d.role}
                          color={d.role === "ADMIN" ? "green" : "blue-gray"}
                        />
                      </div>
                    </td>

                    <td className={classes}>
                      <Typography variant="small" color="blue-gray" className="font-normal">
                        {formattedDate}
                      </Typography>
                    </td>

                    <td className={classes}>
                      <div className="flex space-x-5 items-center">
                        <Tooltip content="Delete User" className="bg-gray-600">
                          <IconButton variant="text" onClick={() => handleUserDelete(d._id)}>
                            <TrashIcon className="h-5 w-5 text-red-500" />
                          </IconButton>
                        </Tooltip>

                        <Tooltip content="Edit User" className="bg-gray-600">
                          <IconButton variant="text">
                            <PencilIcon className="h-5 w-5" />
                          </IconButton>
                        </Tooltip>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </CardBody>
        <CardFooter className="flex items-center justify-between border-t border-blue-gray-50 p-4">
          <Typography variant="small" color="blue-gray" className="font-normal">
            Page {page} of {totalPages}
          </Typography>
          <div className="flex gap-2">
            <Button variant="outlined" size="sm" onClick={handlePreviousPage} className="rounded">
              Previous
            </Button>
            <Button variant="outlined" size="sm" onClick={handleNextPage} className="rounded">
              Next
            </Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}

{
  /**
   * 
   * const selectedHeaders = ["name", "email", "job", "date"]; // Customize this array with the keys you want

// Filter table headers based on selected keys
const tableHeaders = TABLE_ROWS.length > 0
  ? Object.keys(TABLE_ROWS[0]).filter((key) => selectedHeaders.includes(key))
  : [];
   */
}
