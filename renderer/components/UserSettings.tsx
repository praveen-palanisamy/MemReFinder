import { Menu, Transition } from "@headlessui/react";
import { Fragment, useState, useCallback } from "react";
import { Cog8ToothIcon } from "@heroicons/react/24/solid";
import { AuthModal } from "./AuthModal";
import { signOut } from "next-auth/react";

// User settings menu with menu items to Login (if not logged in) or Logout (if logged in). Show cog icon if not logged in, else show user icon.
export default function UserSettings({ session, theme, toggleTheme }) {
  const user = session?.user;
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const authModalProps = {
    open: authModalOpen,
    setOpen: setAuthModalOpen,
  };
  const handleThemeToggle = useCallback(() => {
    toggleTheme(theme === "light" ? "dark" : "light");
  }, [theme, toggleTheme]);
  const activeClass = "bg-gray-50 dark:bg-gray-400";
  const inactiveClass = "bg-gray-100 dark:bg-gray-300";
  return (
    <>
      <Menu as="div" className="ml-1 relative">
        {({ open }) => (
          <>
            <div>
              <Menu.Button className="bg-white dark:bg-slate rounded-full flex text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500">
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
                className="origin-top-right transform -translate-y-1 mt-2 w-36 rounded-md shadow-lg py-1 bg-white dark:bg-gray-300 ring-1 ring-black ring-opacity-5 focus:outline-none"
              >
                <Menu.Item>
                  {!user
                    ? ({ active }) => (
                        <button
                          onClick={() => setAuthModalOpen(true)}
                          className={`${
                            active ? `${activeClass}` : `${inactiveClass}`
                          } block px-4 py-2 text-sm text-gray-700 w-full text-left`}
                        >
                          Login
                        </button>
                      )
                    : ({ active }) => (
                        <button
                          onClick={() => signOut()}
                          className={`${
                            active ? `${activeClass}` : `${inactiveClass}`
                          } block px-4 py-2 text-sm text-black dark:text-white w-full text-left`}
                        >
                          Logout
                        </button>
                      )}
                </Menu.Item>
                <Menu.Item>
                  {({ active }) => (
                    <button
                      onClick={handleThemeToggle}
                      className={`${
                        active ? `${activeClass}` : `${inactiveClass}`
                      } block px-4 py-2 text-sm text-gray-700 w-full text-left`}
                    >
                      {theme === "light" ? "Dark" : "Light"} theme
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
