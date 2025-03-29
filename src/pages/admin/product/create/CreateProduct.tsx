import { Field, Form, Formik, FormikHelpers } from "formik";
import { CurrencyDollarIcon, XCircleIcon } from "@heroicons/react/24/outline";

import { clx } from "../../../../util";
import { useFile } from "../../../../hooks/useFile";
import { useCreateProductMutation } from "../../../../features/products/product.slice";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useAddCategoryMutation } from "../../../../features/category/category.slice";

type Size = {
  name: string;
  inStock: boolean;
};

interface InitialValuesInterface {
  price: number;
  description: string;
  imageSrc: File | null;
  category: string;
  stock: number;
  name: string;
  featured: boolean;
  colors: string[];
  sizes: Size[];
}

const initialValues: InitialValuesInterface = {
  price: 10,
  description: "",
  imageSrc: null,
  category: "",
  stock: 1,
  featured: false,
  name: "",
  colors: [],
  sizes: [],
};

export default function CreateNewProduct() {
  const {
    isDropping,
    selectedFile,
    setSelectedFile,
    fileInputRef,
    handleDragEnter,
    handleDrop,
    handleDragOver,
    handleDragLeave,
  } = useFile();
  const [createProduct] = useCreateProductMutation();
  const [addCategory] = useAddCategoryMutation();
  const navigate = useNavigate();

  async function onSubmit(
    values: InitialValuesInterface,
    { resetForm }: FormikHelpers<InitialValuesInterface>
  ) {
    try {
      await addCategory({ name: values.category }).unwrap();
      const response = await createProduct(values).unwrap();

      toast(response.message, {
        type: "success",
      });

      await new Promise((resolve) => setTimeout(resolve, 1500));
      navigate("/admin/products/all");
      window.location.reload();

      resetForm();
    } catch (error: any) {
      toast.error(error.data.message || error.error);
    }
  }

  return (
    <Formik initialValues={initialValues} onSubmit={onSubmit}>
      {({ errors, touched, setFieldValue, values }) => {
        return (
          <Form className="mt-4 w-full bg-white p-6 border gap-10 grid grid-cols-1 xl:grid-cols-3 mx-auto max-w-6xl">
            <div className="col-span-full xl:col-span-2">
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
                      errors.name && touched.name ? "ring-red-500" : "focus:ring-indigo-500"
                    )}
                  />
                </div>
              </fieldset>

              <fieldset className="mt-2">
                <label
                  htmlFor="description"
                  className="capitalize text-sm font-normal text-gray-700 sm:text-base"
                >
                  product description
                </label>

                <div className="mt-2 relative">
                  <Field
                    name="description"
                    as="textarea"
                    rows={3}
                    placeholder="description title.."
                    className={clx(
                      "block w-full  rounded border-0 p-3 text-gray-700 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset text-sm outline-none",
                      errors.name && touched.name ? "ring-red-500" : "focus:ring-indigo-500"
                    )}
                  />
                </div>
              </fieldset>

              <fieldset className="mt-2 flex-1">
                <label
                  htmlFor="category"
                  className="capitalize text-sm font-normal text-gray-700 sm:text-base"
                >
                  product category
                </label>

                <div className="mt-2 relative">
                  <Field
                    name="category"
                    as="select"
                    onChange={(e: any) => {
                      setFieldValue("category", e.target.value);
                    }}
                    className={clx(
                      "block w-full  rounded border-0 p-3 text-gray-700 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset text-sm outline-none",
                      errors.name && touched.name ? "ring-red-500" : "focus:ring-indigo-500"
                    )}
                  >
                    <option>select category</option>
                    <option>fasion</option>
                    <option>kitchen</option>
                    <option>electronics</option>
                    <option>cream</option>
                    <option>office</option>
                    <option>sneakers</option>
                  </Field>
                </div>
              </fieldset>

              <fieldset className="flex items-center gap-2 mt-2">
                <Field
                  name="featured"
                  type="checkbox"
                  className={clx(
                    "h-5 w-5 border focus:outline-none focus:ring-0 rounded placeholder:text-gray-400"
                  )}
                />
                <label
                  htmlFor="featured"
                  className="capitalize text-sm font-normal text-gray-700 sm:text-base"
                >
                  featured
                </label>
              </fieldset>

              <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-5">
                <fieldset className="mt-2">
                  <label
                    htmlFor="stock"
                    className="capitalize text-sm font-normal text-gray-700 sm:text-base"
                  >
                    product stock
                  </label>

                  <div className="mt-2 relative">
                    <Field
                      name="stock"
                      type="number"
                      className={clx(
                        "block w-full rounded border-0 p-3 text-gray-700 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset text-sm outline-none",
                        errors.name && touched.name ? "ring-red-500" : "focus:ring-indigo-500"
                      )}
                    />
                  </div>
                </fieldset>

                <fieldset className="mt-2">
                  <label
                    htmlFor="price"
                    className="capitalize text-sm font-normal text-gray-700 sm:text-base"
                  >
                    product price
                  </label>
                  <div
                    className={clx(
                      errors.price && touched.price ? "ring-red-500" : "focus:ring-indigo-500",
                      "flex items-stretch border rounded overflow-hidden focus-within:ring-2 lg:w-[20rem] focus-within:ring-indigo-600 focus-within:border-transparent h-11 mt-2"
                    )}
                  >
                    <span className="relative flex items-center justify-center self-center w-12 border-r border-gray-300 h-full bg-gray-100">
                      <CurrencyDollarIcon className="text-gray-700 h-7" />
                    </span>
                    <Field
                      name="price"
                      type="number"
                      className={clx(
                        "block w-full h-full px-4 flex-1 py-3 border-none focus:outline-none focus:ring-0 placeholder:text-gray-400 text-gray-700"
                      )}
                    />
                  </div>
                </fieldset>
              </div>

              <fieldset className="mt-4">
                <label
                  htmlFor="colors"
                  className="capitalize text-sm font-normal text-gray-700 sm:text-base"
                >
                  Product Colors
                </label>
                <div className="mt-2">
                  <div className="flex gap-2 items-center">
                    <Field
                      type="text"
                      name="colors"
                      placeholder="Enter color"
                      className="block w-full px-3 rounded border border-gray-300 py-2 text-gray-700 placeholder:text-gray-400 focus:ring-2 focus:ring-indigo-500 text-sm"
                      onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
                        if (e.key === "Enter" && e.currentTarget.value.trim()) {
                          e.preventDefault();

                          const newColors = e.currentTarget.value
                            .split(",")
                            .map((color) => color.trim())
                            .filter((color) => color);

                          setFieldValue("colors", [
                            ...(Array.isArray(values.colors) ? values.colors : []),
                            ...newColors,
                          ]);
                          e.currentTarget.value = "";
                        }
                      }}
                    />
                  </div>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {Array.isArray(values?.colors) &&
                      values?.colors?.map((color, index) => (
                        <span
                          key={index}
                          className="border bg-gray-100 text-gray-800 rounded-full px-2 py-1 text-sm flex items-center gap-2"
                        >
                          {color}
                          <button
                            type="button"
                            className="text-red-500 hover:text-red-700"
                            onClick={() =>
                              setFieldValue(
                                "colors",
                                values?.colors?.filter((_, i) => i !== index)
                              )
                            }
                          >
                            <XCircleIcon className="h-6" />
                            <span className="sr-only"> add color </span>
                          </button>
                        </span>
                      ))}
                  </div>
                </div>
              </fieldset>

              {/* Sizes Section */}
              <fieldset className="mt-4">
                <label
                  htmlFor="sizes"
                  className="capitalize text-sm font-normal text-gray-700 sm:text-base"
                >
                  Product Sizes
                </label>
                <div className="mt-2">
                  {values.sizes.length > 0 ? (
                    values.sizes.map((_, index) => (
                      <div key={index} className="flex gap-2 items-center mb-2">
                        <Field
                          name={`sizes[${index}].name`}
                          type="text"
                          placeholder="Size name"
                          className="block w-full px-3 rounded border border-gray-300 py-2 text-gray-700 placeholder:text-gray-400 focus:ring-2 focus:ring-indigo-500 text-sm"
                        />
                        <Field
                          name={`sizes[${index}].inStock`}
                          type="checkbox"
                          className="h-5 w-5 rounded-md"
                        />
                        <button
                          type="button"
                          className="text-red-500 hover:text-red-700"
                          onClick={() =>
                            setFieldValue(
                              "sizes",
                              values.sizes.filter((_, i) => i !== index)
                            )
                          }
                        >
                          <XCircleIcon className="h-6" />
                          <span className="sr-only"> add size </span>
                        </button>
                      </div>
                    ))
                  ) : (
                    <p className="text-base text-gray-500 text-center"> no size added</p>
                  )}
                  <button
                    type="button"
                    onClick={() =>
                      setFieldValue("sizes", [
                        ...values.sizes,
                        {
                          name: "",
                          inStock: false,
                        },
                      ])
                    }
                    className="mt-2 px-3 py-1 bg-indigo-500 text-white rounded text-sm"
                  >
                    Add Size
                  </button>
                </div>
              </fieldset>
            </div>

            <div className="col-span-full xl:col-span-1">
              <div
                className={clx("col-span-full xl:col-span-1", !selectedFile ? "xl:h-64" : "h-fit")}
              >
                <fieldset className="h-full">
                  <label
                    htmlFor="image"
                    className="capitalize font-medium font-nunito-sans text-base sm:text-lg mb-2"
                  >
                    product image
                  </label>
                  <div
                    onDragEnter={handleDragEnter}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                    className={clx(
                      "border-dashed px-6 h-full py-9 border-[0.15rem] mt-2 rounded-md flex items-center justify-center",
                      isDropping ? "border-indigo-400" : "border-gray-400"
                    )}
                  >
                    <div className="text-center">
                      {selectedFile && (
                        <div className="h-32 w-full ring-2 ring-offset-2 ring-indigo-500 rounded overflow-hidden mb-1 mx-auto">
                          <img
                            src={URL.createObjectURL(selectedFile)}
                            alt="upload"
                            className="object-cover h-full w-full"
                          />
                        </div>
                      )}
                      <div className="text-center">
                        <label
                          htmlFor="imageSrc"
                          className="relative cursor-pointer rounded-md font-normal font-nunito-sans text-base text-gray-400 hover:text-indigo-400 "
                        >
                          {!selectedFile && <span>Select product image or drag and drop</span>}
                          <input
                            type="file"
                            id="imageSrc"
                            name="imageSrc"
                            hidden
                            ref={fileInputRef}
                            onChange={(event) => {
                              const files = event?.currentTarget.files;

                              if (files && files.length > 0) {
                                setFieldValue("imageSrc", files[0]);
                                setSelectedFile(files[0]);
                              }
                            }}
                          />
                        </label>
                      </div>
                      {!selectedFile && (
                        <div>
                          <p className="text-base font-nunito-sans font-normal text-gray-500 dark:text-gray-200">
                            Recommended size
                          </p>
                          <p className="text-sm font-nunito-sans font-normal text-gray-500 dark:text-gray-200">
                            1280 * 720
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </fieldset>

                {selectedFile && (
                  <fieldset className="mt-4">
                    <button
                      type="button"
                      onClick={() => {
                        if (fileInputRef.current) fileInputRef.current.click();
                      }}
                      className="rounded bg-white px-2.5 py-2 text-sm font-medium text-gray-900 shadow ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                    >
                      Change product image
                    </button>
                  </fieldset>
                )}
              </div>
            </div>

            <div className="flex items-center gap-4 mt-4">
              <button
                type="submit"
                // disabled={!dirty}
                className="disabled:ring-gray-200 disabled:pointer-events-none disabled:text-indigo-300 disabled:bg-[#FAFAFA] disabled:ring-1 text-base capitalize font-medium border-none ring-2 w-fit ring-gray-200 rounded-md py-2.5 px-6 text-white bg-indigo-500"
              >
                create product
              </button>
            </div>
          </Form>
        );
      }}
    </Formik>
  );
}
