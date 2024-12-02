import { Field, Form, Formik } from "formik";
import { ArrowLeftCircleIcon, CurrencyDollarIcon } from "@heroicons/react/24/outline";
import { clx } from "../../../../util";
import { Button } from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";
import { useProduct } from "../../../../hooks/useProduct";
import { useGetAllCategoryQuery } from "../../../../features/category/category.slice";
import { useUpdateProductMutation } from "../../../../features/products/product.slice";
import { toast } from "react-toastify";
import { useEffect, useRef, useState } from "react";

type ImageSrcType = {
  url: string;
  public_id: string;
};

interface ProductCategory {
  _id: string;
  name: string;
}

interface InitialValuesInterface {
  price: number;
  description: string;
  imageSrc: File | ImageSrcType | null;
  category: ProductCategory;
  stock: number;
  name: string;
  featured: boolean;
}

export default function EditProduct() {
  const navigate = useNavigate();
  const { product } = useProduct();
  const { data: categoriedData } = useGetAllCategoryQuery();
  const [updateProduct] = useUpdateProductMutation();
  const [updating, setUpdating] = useState<boolean>(false);

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
    category: product?.category ?? ({} as ProductCategory),
    stock: product?.stock ?? 1,
    featured: product?.featured ?? false,
    name: product?.name ?? "",
  };

  async function onSubmit(values: InitialValuesInterface) {
    console.log(values);
    try {
      const response = await updateProduct({ _id: product._id, ...values }).unwrap();
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
      toast.error(error.error);
    }
  }

  console.log(`initial values: ${initialValues}`);

  useEffect(() => {
    return () => {
      if (selectedFile instanceof File) {
        URL.revokeObjectURL(selectedFile.name);
      }
    };
  }, [selectedFile]);

  return (
    <div className="mx-auto max-w-6xl mt-4 space-y-2">
      <Button
        type="button"
        className="flex items-center gap-3"
        variant="text"
        onClick={() => navigate("/admin/products/all")}
      >
        <ArrowLeftCircleIcon className="h-6" />
        back
      </Button>
      <Formik initialValues={initialValues} onSubmit={onSubmit}>
        {({ errors, touched, setFieldValue }) => {
          return (
            <Form className="w-full bg-white p-6 border gap-10 grid grid-cols-1 xl:grid-cols-3">
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
                        errors.name && touched.name ? "ring-red-500" : "focus:ring-indigo-500",
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
                        errors.name && touched.name ? "ring-red-500" : "focus:ring-indigo-500",
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
                        "block w-full  rounded border-0 p-3 text-gray-700 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset text-sm outline-none",
                        errors.name && touched.name ? "ring-red-500" : "focus:ring-indigo-500",
                      )}
                    >
                      <option disabled>select category</option>
                      {(categories ?? []).map((category) => {
                        return (
                          <option key={category._id} value={category.name}>
                            {category.name}
                          </option>
                        );
                      })}
                    </Field>
                  </div>
                </fieldset>

                <fieldset className="flex items-center gap-2 mt-2">
                  <Field
                    name="featured"
                    type="checkbox"
                    className={clx(
                      "h-5 w-5 border focus:outline-none focus:ring-0 rounded placeholder:text-gray-400",
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
                          errors.name && touched.name ? "ring-red-500" : "focus:ring-indigo-500",
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
                        "flex items-stretch border rounded overflow-hidden focus-within:ring-2 lg:w-[20rem] focus-within:ring-indigo-600 focus-within:border-transparent h-11 mt-2",
                      )}
                    >
                      <span className="relative flex items-center justify-center self-center w-12 border-r border-gray-300 h-full bg-gray-100">
                        <CurrencyDollarIcon className="text-gray-700 h-7" />
                      </span>
                      <Field
                        name="price"
                        type="number"
                        className={clx(
                          "block w-full h-full px-4 flex-1 py-3 border-none focus:outline-none focus:ring-0 placeholder:text-gray-400 text-gray-700",
                        )}
                      />
                    </div>
                  </fieldset>
                </div>
              </div>

              <div className="col-span-full xl:col-span-1">
                <div
                  className={clx(
                    "col-span-full xl:col-span-1",
                    !selectedFile ? "xl:h-64" : "h-fit",
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
                        "border-dashed px-6 h-full py-9 border-[0.15rem] mt-2 rounded-md flex items-center justify-center",
                        isDropping ? "border-indigo-400" : "border-gray-400",
                      )}
                    >
                      <div className="text-center">
                        <div className="h-32 w-full ring-2 ring-offset-2 ring-indigo-500 rounded overflow-hidden mb-1 mx-auto">
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
                <Button
                  type="submit"
                  variant="filled"
                  disabled={updating}
                  className="text-base capitalize font-medium border-none ring-2 w-fit ring-gray-200 rounded-md py-2.5 px-6 text-white bg-indigo-500"
                >
                  {updating ? "updating..." : "update product"}
                </Button>
              </div>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
}
