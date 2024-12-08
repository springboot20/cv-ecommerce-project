import { Card, Typography, CardBody, Chip, Checkbox } from "@material-tailwind/react";
import { classNames, formatPrice } from "../../helpers";

const OrderTable: React.FC<{
  columns: string[];
  data: any;
  children?: React.ReactNode;
  enableHeader?: boolean;
  Header?: JSX.Element;
  loading: boolean;
}> = ({ columns, data, children, enableHeader = false, Header, loading }) => {
  return (
    <Card
      className="h-full w-full !rounded-none !shadow !p-2 mt-4"
      placeholder={undefined}
      onPointerEnterCapture={undefined}
      onPointerLeaveCapture={undefined}
    >
      {enableHeader && Header && Header}
      <CardBody
        className="overflow-x-auto p-0"
        placeholder={undefined}
        onPointerEnterCapture={undefined}
        onPointerLeaveCapture={undefined}
      >
        {loading ? (
          <div className="flex items-center justify-center p-4 bg-gray-50">
            <svg className="h-7 w-7 animate-spin" viewBox="3 3 18 18">
              <path
                className="fill-gray-300"
                d="M12 5C8.13401 5 5 8.13401 5 12C5 15.866 8.13401 19 12 19C15.866 19 19 15.866 19 12C19 8.13401 15.866 5 12 5ZM3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12Z"
              ></path>
              <path
                className="fill-secondary"
                d="M16.9497 7.05015C14.2161 4.31648 9.78392 4.31648 7.05025 7.05015C6.65973 7.44067 6.02656 7.44067 5.63604 7.05015C5.24551 6.65962 5.24551 6.02646 5.63604 5.63593C9.15076 2.12121 14.8492 2.12121 18.364 5.63593C18.7545 6.02646 18.7545 6.65962 18.364 7.05015C17.9734 7.44067 17.3403 7.44067 16.9497 7.05015Z"
              ></path>
            </svg>
            <span className="ml-2">orders loading...</span>
          </div>
        ) : (
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
                        className="font-medium leading-none capitalize opacity-70"
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
                        className="font-normal opacity-70"
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
                        className="font-normal opacity-70"
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
                        className="font-normal opacity-70"
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
                        className="font-normal opacity-70"
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
                          value={d?.orderStatus ?? ""}
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
        )}
      </CardBody>

      {children}
    </Card>
  );
};

export default OrderTable;
