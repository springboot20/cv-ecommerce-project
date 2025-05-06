import { Field, Form, Formik } from "formik";
import { ArrowLeftCircleIcon, CurrencyDollarIcon, XCircleIcon } from "@heroicons/react/24/outline";
import { clx } from "../../../../util";
import { Button } from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";
import { useProduct } from "../../../../hooks/useProduct";
import { useGetAllCategoryQuery } from "../../../../features/category/category.slice";
import { useUpdateProductMutation } from "../../../../features/products/product.slice";
import { toast } from "react-toastify";
import { useEffect, useRef, useState } from "react";
import { Loader } from "../../../../components/Loader";
import { ProductType } from "../../../../types/redux/product";

type ImageSrcType = {
  url: string;
  public_id: string;
};

type Size = {
  name: string;
  inStock: boolean;
};

interface ProductCategory {
  _id: string;
  name: string;
}

interface InitialValuesInterface {
  price: number;
  description: string;
  imageSrc: File | ImageSrcType | null;
  category: string;
  stock: number;
  name: string;
  featured: boolean;
  colors: string[];
  sizes: Size[];
}

export default function EditProduct() {
  const navigate = useNavigate();
  const { data: product_data, isLoading } = useProduct();
  const { data: categoriedData } = useGetAllCategoryQuery();
  const [updateProduct] = useUpdateProductMutation();
  const [updating, setUpdating] = useState<boolean>(false);
  const [product, setProduct] = useState<ProductType | null>(null);
  const [formKey, setFormKey] = useState(0);

  const categories = categoriedData?.data.categories as ProductCategory[];
  const [selectedFile, setSelectedFile] = useState<File>(null!);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const [isDropping, setIsDropping] = useState<boolean>(false);

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDropping(false);
    if (event.dataTransfer.files && event.dataTransfer.files.length > 0) {
      setSelectedFile(event.dataTransfer.files[0]);
      event.dataTransfer.clearData();
    }
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  const handleDragLeave = () => {
    setIsDropping(false);
  };

  const handleDragEnter = (e: React.DragEvent<HTMLInputElement>) => {
    e.preventDefault();
    setIsDropping(true);
  };

  const initialValues: InitialValuesInterface = {
    price: product?.price ?? 10,
    description: product?.description ?? "",
    imageSrc: product?.imageSrc ?? selectedFile,
    category: product?.category?.name ?? "",
    stock: product?.stock ?? 1,
    featured: product?.featured ?? false,
    name: product?.name ?? "",
    colors: product?.colors ?? [],
    sizes: product?.sizes ?? [],
  };

  async function onSubmit(values: InitialValuesInterface) {
    console.log(values);
    try {
      const response = await updateProduct({ _id: product?._id, ...values }).unwrap();
      const data = await response.data;

      toast(response.message, {
        type: "success",
      });
      setUpdating(true);

      await new Promise((resolve) => setTimeout(resolve, 1500));
      navigate("/admin/products/all", { replace: true });

      return data;
    } catch (error: any) {
      console.log(error);
      setUpdating(false);
      toast.error(error?.data?.message || error?.error);
    }
  }

  console.log(`initial values: ${JSON.stringify(initialValues)}`);

  useEffect(() => {
    return () => {
      if (selectedFile instanceof File) {
        URL.revokeObjectURL(selectedFile.name);
      }
    };
  }, [selectedFile]);

  useEffect(() => {
    if (product_data?.data.product) {
      setProduct(product_data?.data.product);
      setFormKey((prev) => prev + 1);
    }
  }, [product_data?.data?.product]);

  console.log(product_data);

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
      <Formik initialValues={initialValues} onSubmit={onSubmit} key={formKey} enableReinitialize>
        {({ errors, touched, values, isSubmitting, setFieldValue }) => {
          return (
            <Form className="w-full bg-white p-6 border gap-10 grid grid-cols-1 xl:grid-cols-3">
              {isLoading || !product_data ? (
                <div className="col-span-full h-[70vh] flex items-center justify-center">
                  <Loader />
                </div>
              ) : (
                <>
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
                          className={clx(
                            "block w-full rounded border-0 p-3 text-gray-700 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset text-sm outline-none",
                            errors.category && touched.category
                              ? "ring-red-500"
                              : "focus:ring-indigo-500"
                          )}
                          value={values.category}
                          onChange={(event: any) => {
                            const selectedCategory = categories?.find(
                              (category) => category.name === event.target.value
                            );
                            setFieldValue("category", selectedCategory?.name);
                          }}
                        >
                          <option disabled>select category</option>
                          {(categories ?? []).map((category) => (
                            <option key={category._id} value={category.name}>
                              {category.name}
                            </option>
                          ))}
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
                              "block w-full  rounded border-0 p-3 text-gray-700 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset text-sm outline-none",
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
                            errors.price && touched.price
                              ? "ring-red-500"
                              : "focus:ring-indigo-500",
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
                      className={clx(
                        "col-span-full xl:col-span-1 h-fit",
                        // !selectedFile ? "xl:h-64" : ""
                      )}
                    >
                      <fieldset className="h-full">
                        <label
                          htmlFor="imageSrc"
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
                            "border-dashed p-6 h-full border-[0.15rem] mt-2 rounded-md flex items-center justify-center",
                            isDropping ? "border-indigo-400" : "border-gray-400"
                          )}
                        >
                          <div className="text-center shrink-0 w-full">
                            <div className="aspect-[1/0.5] lg:aspect-[1/1] w-full ring-2 ring-offset-2 ring-indigo-500 rounded overflow-hidden mb- ">
                              <img
                                src={
                                  selectedFile
                                    ? URL.createObjectURL(selectedFile)
                                    : product?.imageSrc?.url // Fallback to product image if selectedFile is invalid
                                }
                                alt="upload"
                                className="object-cover h-full w-full"
                                onLoad={() => {
                                  if (selectedFile instanceof Blob) {
                                    // Revoke the object URL to prevent memory leaks
                                    URL.revokeObjectURL(URL.createObjectURL(selectedFile));
                                  }
                                }}
                              />
                            </div>

                            <div className="text-center">
                              <label
                                htmlFor="imageSrc"
                                className="relative cursor-pointer rounded-md font-normal text-base text-gray-400 hover:text-indigo-400 "
                              >
                                {(!selectedFile && !product?.imageSrc) && (
                                  <span>Select product image or drag and drop</span>
                                )}
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
                            {(!selectedFile && !product?.imageSrc) && (
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

                      {(selectedFile || product?.imageSrc) && (
                        <fieldset className="mt-4 lg:mt-8">
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
                disabled={isSubmitting && updating}
                className={clx(
                  "disabled:ring-gray-200 disabled:pointer-events-none disabled:text-indigo-300 disabled:bg-[#FAFAFA] disabled:ring-1 text-base capitalize font-medium border-none ring-2 w-fit ring-gray-200 rounded-md py-2.5 px-6 text-white bg-indigo-500",
                  isSubmitting && updating ? "flex gap-2 items-center cursor-not-allowed" : "text-center"
                )}
              >
                      {(updating && isSubmitting)? (
                        <>
                          <span>updating...</span>
                          <svg className="h-8 w-8 animate-spin" viewBox="3 3 18 18">
                            <path
                              className="fill-gray-300"
                              d="M12 5C8.13401 5 5 8.13401 5 12C5 15.866 8.13401 19 12 19C15.866 19 19 15.866 19 12C19 8.13401 15.866 5 12 5ZM3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12Z"
                            ></path>
                            <path
                              className="fill-secondary"
                              d="M16.9497 7.05015C14.2161 4.31648 9.78392 4.31648 7.05025 7.05015C6.65973 7.44067 6.02656 7.44067 5.63604 7.05015C5.24551 6.65962 5.24551 6.02646 5.63604 5.63593C9.15076 2.12121 14.8492 2.12121 18.364 5.63593C18.7545 6.02646 18.7545 6.65962 18.364 7.05015C17.9734 7.44067 17.3403 7.44067 16.9497 7.05015Z"
                            ></path>
                          </svg>
                        </>
                      ) : (
                        "update product"
                      )}
                    </button>
                  </div>
                </>
              )}
            </Form>
          );
        }}
      </Formik>
    </div>
  );
}
