import { Disclosure } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { List, ListItem } from "@material-tailwind/react";

export const CategoryPanel = () => {
  return (
    <>
      <div className="fixed hidden lg:block flex-1 max-w-sm min-h-screen top-36 w-full flex-col z-10 border-r">
        <div className="w-full h-full p-2">
          <Disclosure.Button className="lg:hidden absolute right-8 top-4">
            <span className="sr-only">Close side panel</span>
            <XMarkIcon className="h-6" aria-hidden={true} />
          </Disclosure.Button>
          <div className="relative mt-8 pb-5 border-b">
            <h1 className="sm:text-lg lg:text-xl font-bold">Category</h1>
            <List className="p-0 mt-3">
              <ListItem className="group rounded-none py-1.5 px-3 text-sm font-medium text-blue-gray-700 hover:bg-gray-100 hover:text-gray-700 focus:bg-gray-200 focus:text-gary-700">
                All
              </ListItem>
              <ListItem className="group rounded-none py-1.5 px-3 text-sm font-medium text-blue-gray-700 hover:bg-gray-100 hover:text-gray-700 focus:bg-gray-200 focus:text-gary-700">
                Cloth
              </ListItem>
            </List>
          </div>
          <div className="relative mt-4 pb-5 border-b">
            <h1 className="sm:text-lg lg:text-xl font-bold">Category</h1>
            <List className="p-0 mt-3">
              <ListItem className="group rounded-none py-1.5 px-3 text-sm font-medium text-blue-gray-700 hover:bg-gray-100 hover:text-gray-700 focus:bg-gray-200 focus:text-gary-700">
                All
              </ListItem>
              <ListItem className="group rounded-none py-1.5 px-3 text-sm font-medium text-blue-gray-700 hover:bg-gray-100 hover:text-gray-700 focus:bg-gray-200 focus:text-gary-700">
                Cloth
              </ListItem>
            </List>
          </div>
        </div>
      </div>

      <Disclosure.Panel className="lg:hidden">
        <div className="fixed left-0 max-w-lg lg:max-w-md right-0 h-[calc(100vh-8.5rem)] top-[8.5rem] flex-col bg-white border z-10">
          <div className="w-full h-full p-4">
            <Disclosure.Button className="lg:hidden absolute right-8 top-4">
              <span className="sr-only">Close side panel</span>
              <XMarkIcon className="h-6" aria-hidden={true} />
            </Disclosure.Button>

            <div className="relative mt-8 pb-5 border-b">
              <h1 className="sm:text-lg lg:text-xl font-bold">Category</h1>
              <List className="p-0 mt-3">
                <ListItem className="group rounded-none py-1.5 px-3 text-sm font-medium text-blue-gray-700 hover:bg-gray-100 hover:text-gray-700 focus:bg-gray-200 focus:text-gary-700">
                  All
                </ListItem>
                <ListItem className="group rounded-none py-1.5 px-3 text-sm font-medium text-blue-gray-700 hover:bg-gray-100 hover:text-gray-700 focus:bg-gray-200 focus:text-gary-700">
                  Cloth
                </ListItem>
              </List>
            </div>
            <div className="relative mt-4 pb-5 border-b">
              <h1 className="sm:text-lg lg:text-xl font-bold">Category</h1>
              <List className="p-0 mt-3">
                <ListItem className="group rounded-none py-1.5 px-3 text-sm font-medium text-blue-gray-700 hover:bg-gray-100 hover:text-gray-700 focus:bg-gray-200 focus:text-gary-700">
                  All
                </ListItem>
                <ListItem className="group rounded-none py-1.5 px-3 text-sm font-medium text-blue-gray-700 hover:bg-gray-100 hover:text-gray-700 focus:bg-gray-200 focus:text-gary-700">
                  Cloth
                </ListItem>
              </List>
            </div>
          </div>
        </div>
      </Disclosure.Panel>
    </>
  );
};
