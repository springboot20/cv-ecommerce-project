import { Fragment } from "react";
import { useFile } from "../../../hooks/useFile";
import { Form, Formik } from "formik";
import { clx } from "../../../util";
import { PhotoIcon } from "@heroicons/react/24/outline";

interface UserAvatarInterface {
  url: string;
  public_id: string;
}

interface InitialValuesInterface {
  avatar: File | UserAvatarInterface | null;
}

export default function Profile() {
  const {
    selectedFile,
    isDropping,
    setSelectedFile,
    fileInputRef,
    handleDragEnter,
    handleDrop,
    handleDragLeave,
    handleDragOver,
  } = useFile();


  const initialValues:InitialValuesInterface = {
    avatar:selectedFile
  }

  async function onSubmit(values: InitialValuesInterface) {
    console.log(values);
  }

  return (
    <Fragment>
      <header className="p-3 border-b">
        <h1 className="text-2xl capitalize font-medium text-gray-600">public profile</h1>
      </header>
      <Formik initialValues={initialValues} onSubmit={onSubmit}>
        {(formik) => {
          return (
            <Form className="grid grid-cols-1 xl:grid-cols-3">
              <div className="col-span-full xl:col-span-2"></div>

              <div className="col-span-full xl:col-span-1 mt-2">
                <fieldset className="mt-3">
                  <label
                    htmlFor="avatar"
                    className="text-sm font-medium text-gray-800 dark:text-gray-50"
                  >
                    Upload photo
                  </label>
                  <div
                    className={clx(
                      "border-dashed px-6 py-9 mt-2 border-2 rounded-md flex justify-center",
                      isDropping ? "border-indigo-400" : "border-gray-400",
                    )}
                    onDragEnter={handleDragEnter}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                  >
                    <div className="text-center">
                      {selectedFile ? (
                        <img
                          src={URL.createObjectURL(selectedFile)}
                          alt="avatar"
                          className="h-32 w-32 object-cover shadow-lg mb-3 ring-2 ring-offset-2 ring-indigo-500 rounded-full mx-auto"
                        />
                      ) : (
                        <PhotoIcon className="mx-auto h-11 w-11 text-gray-500 dark:text-gray-50" />
                      )}
                      <div className="text-center">
                        <label
                          htmlFor="avatar"
                          className="relative cursor-pointer rounded-md font-medium text-indigo-600 hover:text-indigo-500 "
                        >
                          <input
                            type="file"
                            id="avatar"
                            name="avatar"
                            hidden
                            ref={fileInputRef}
                            onChange={(event) => {
                              if (event.target.files && event.target.files.length > 0) {
                                const files = event.target.files;

                                formik.setFieldValue("avatar", files[0]);
                                setSelectedFile(files[0]);
                              }
                            }}
                          />
                          <span>Upload photo</span>
                        </label>
                        <p className="pl-1 dark:text-gray-50">or drag and drop</p>
                      </div>
                      <p className="text-xs leading-5 text-gray-500 dark:text-gray-200">
                        PNG, JPEG, JPG, GIF and SVG up to 5mb
                      </p>
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
                      Change profile image
                    </button>
                  </fieldset>
                )}
              </div>
            </Form>
          );
        }}
      </Formik>
    </Fragment>
  );
}
