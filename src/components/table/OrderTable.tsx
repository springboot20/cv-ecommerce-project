import { Card, Typography, CardBody, Chip, Checkbox } from "@material-tailwind/react";
import { classNames, formatPrice } from "../../helpers";

const OrderTable: React.FC<{ columns: string[]; data: any; children?: React.ReactNode }> = ({
  columns,
  data,
  children,
}) => {
  return (
    <Card
      className="h-full w-full !rounded-none !shadow !p-2 mt-4"
      placeholder={undefined}
      onPointerEnterCapture={undefined}
      onPointerLeaveCapture={undefined}
    >
      <CardBody
        className="overflow-x-auto p-0"
        placeholder={undefined}
        onPointerEnterCapture={undefined}
        onPointerLeaveCapture={undefined}
      >
        <table className="w-full min-w-max table-auto text-left">
          <thead>
            <tr>
              {columns.map((head) => (
                <th key={head} className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-2">
                  <div className="flex items-center space-x-3">
                    {head === "id" && (
                      <Checkbox
                        crossOrigin={undefined}
                        onPointerEnterCapture={undefined}
                        onPointerLeaveCapture={undefined}
                      />
                    )}
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal leading-none capitalize opacity-70"
                      placeholder={undefined}
                      onPointerEnterCapture={undefined}
                      onPointerLeaveCapture={undefined}
                    >
                      {head}
                    </Typography>
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data?.map((d: any, index: number) => {
              const isLast = index === data?.length - 1;
              const classes = isLast ? "p-2" : "p-2 border-b border-blue-gray-50";
              let date = new Date(d?.createdAt ?? Date.now());
              const formattedDate = `${date.getDate()}/${
                date.getMonth() > 9 ? date.getMonth() : date.getMonth()
              }/${date.getFullYear()}`;

              return (
                <tr key={d?._id}>
                  <td className={classes}>
                    <div className="flex items-center space-x-3">
                      <Checkbox
                        crossOrigin={undefined}
                        onPointerEnterCapture={undefined}
                        onPointerLeaveCapture={undefined}
                      />
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal opacity-70"
                        placeholder={undefined}
                        onPointerEnterCapture={undefined}
                        onPointerLeaveCapture={undefined}
                      >
                        {d?._id}
                      </Typography>
                    </div>
                  </td>

                  <td className={classes}>
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                      placeholder={undefined}
                      onPointerEnterCapture={undefined}
                      onPointerLeaveCapture={undefined}
                    >
                      {d?.customer?.username}
                    </Typography>
                  </td>

                  <td className={classes}>
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                      placeholder={undefined}
                      onPointerEnterCapture={undefined}
                      onPointerLeaveCapture={undefined}
                    >
                      {d?.customer?.email}
                    </Typography>
                  </td>

                  <td className={classes}>
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                      placeholder={undefined}
                      onPointerEnterCapture={undefined}
                      onPointerLeaveCapture={undefined}
                    >
                      {formatPrice(d?.orderPrice ?? 0)}
                    </Typography>
                  </td>

                  <td className={classes}>
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                      placeholder={undefined}
                      onPointerEnterCapture={undefined}
                      onPointerLeaveCapture={undefined}
                    >
                      {formattedDate}
                    </Typography>
                  </td>

                  <td className={classes}>
                    <div className="w-max">
                      <Chip
                        variant="ghost"
                        size="sm"
                        value={d?.orderStatus}
                        className={classNames(
                          d?.orderStatus === "PENDING"
                            ? "bg-[#FF5733]"
                            : d?.orderStatus === "COMPLETED"
                            ? "bg-[#E90E50]"
                            : "",
                          "text-white",
                        )}
                      />
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </CardBody>

      {children}
    </Card>
  );
};

export default OrderTable;
