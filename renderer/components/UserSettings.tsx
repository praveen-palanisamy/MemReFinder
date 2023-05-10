import { Menu, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import { Cog8ToothIcon } from "@heroicons/react/24/solid";
import { AuthModal } from "./AuthModal";
import { signOut } from "next-auth/react";

// User settings menu with menu items to Login (if not logged in) or Logout (if logged in). Show cog icon if not logged in, else show user icon.
export default function UserSettings() {
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const authModalProps = {
    open: authModalOpen,
    setOpen: setAuthModalOpen,
  };
  return (
    <>
      <Menu as="div" className="ml-1 relative">
        {({ open }) => (
          <>
            <div>
              <Menu.Button className="bg-white rounded-full flex text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500">
                <span className="sr-only">Open user menu</span>
                <Cog8ToothIcon className="h-8 w-8" />
              </Menu.Button>
            </div>
            <Transition
              show={open}
              as={Fragment}
              enter="transition ease-out duration-100"
              enterFrom="transform opacity-0 scale-95"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-75"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95"
            >
              <Menu.Items
                static
                className="origin-top-right transform -translate-y-full mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
              >
                <Menu.Item>
                  {({ active }) => (
                    <button
                      onClick={() => setAuthModalOpen(true)}
                      className={`${
                        active ? "bg-gray-100" : ""
                      } block px-4 py-2 text-sm text-gray-700 w-full text-left`}
                    >
                      Login
                    </button>
                  )}
                </Menu.Item>
                <Menu.Item>
                  {({ active }) => (
                    <button
                      onClick={() => signOut()}
                      className={`${
                        active ? "bg-gray-100" : ""
                      } block px-4 py-2 text-sm text-gray-700 w-full text-left`}
                    >
                      Logout
                    </button>
                  )}
                </Menu.Item>
              </Menu.Items>
            </Transition>
          </>
        )}
      </Menu>
      <AuthModal {...authModalProps} />
    </>
  );
}
