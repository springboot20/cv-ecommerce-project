import { ArrowLeftCircleIcon } from "@heroicons/react/24/outline";
import { Button } from "@material-tailwind/react";
import { Field, Form, Formik } from "formik";
import { useNavigate, useParams } from "react-router-dom";
import { useUpdateUserMutation } from "../../../../features/users/users.slice";
import { toast } from "react-toastify";
import { clx } from "../../../../util";

interface InitialValuesInterface {}

const initialValues: InitialValuesInterface = {};

const EditUser = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [updateUser] = useUpdateUserMutation();

  async function onSubmit(values: InitialValuesInterface) {
    try {
      const response = await updateUser({ _id: id as string, values }).unwrap();
      const data = await response.data;

      toast(response.message, {
        type: "success",
      });

      return data;
    } catch (error: any) {
      toast(error.error, { type: "error" });
      toast(error.data.message, { type: "error" });
    }
  }

  return (
    <div className="mx-auto max-w-6xl mt-4 space-y-2">
      <Button
        type="button"
        className="flex items-center gap-3"
        variant="text"
        onClick={() => navigate("/admin/products/all")}
        placeholder={undefined}
        onPointerEnterCapture={undefined}
        onPointerLeaveCapture={undefined}
      >
        <ArrowLeftCircleIcon className="h-6" />
        back
      </Button>
      <Formik initialValues={initialValues} onSubmit={onSubmit}>
        {() => {
          return (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
              <div className="col-span-full xl:col-span-1 p-6 border"></div>
              <Form className="col-span-full xl:col-span-2 w-full bg-white p-6 border">
                <fieldset className="mt-2">
                  <label
                    htmlFor="name"
                    className="capitalize text-sm font-normal text-gray-700 sm:text-base"
                  >
                    product name
                  </label>

                  <div className="mt-2 relative">
                    <Field
                      name="name"
                      placeholder="product title.."
                      className={clx(
                        "block w-full  px-3 rounded border-0 py-3 text-gray-700 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset text-sm outline-none",
                        // errors.name && touched.name ? "ring-red-500" : "focus:ring-indigo-500",
                      )}
                    />
                  </div>
                </fieldset>
              </Form>
              ;
            </div>
          );
        }}
      </Formik>
    </div>
  );
};

export default EditUser;
