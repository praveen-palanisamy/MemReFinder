import { Fragment, useState, useCallback, useContext, useEffect } from "react";
import { Cog8ToothIcon } from "@heroicons/react/24/solid";
import { AuthModal } from "./AuthModal";
import { signOut } from "next-auth/react";
import { Popover, Transition } from "@headlessui/react";
import { AppContext } from "@/pages/_app";
import { useSession } from "next-auth/react";

// User settings menu with menu items to Login (if not logged in) or Logout (if logged in). Show cog icon if not logged in, else show user icon.
export default function UserSettings() {
  const { data: session } = useSession();
  const { theme, setTheme: setTheme } = useContext(AppContext);
  const bgColor = theme === "dark" ? "bg-slate-800" : "bg-white";
  const textColor = theme === "dark" ? "text-white" : "text-black";
  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);
  const user = session?.user;
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const authModalProps = {
    open: authModalOpen,
    setOpen: setAuthModalOpen,
  };
  const handleThemeToggle = useCallback(() => {
    setTheme(theme === "light" ? "dark" : "light");
  }, [theme]);
  const activeClass = "bg-gray-50 dark:bg-gray-400";
  const inactiveClass = "bg-gray-100 dark:bg-gray-300";
  return (
    <>
      <Popover>
        {({ open }) => (
          <>
            <Popover.Button
              className={`${
                open ? "text-gray-900" : "text-gray-500"
              } group bg-white dark:bg-slate rounded-full inline-flex items-center text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500`}
            >
              <span className="sr-only">Open user menu</span>
              <Cog8ToothIcon className="h-12 w-12" />
            </Popover.Button>

            <Transition
              show={open}
              as={Fragment}
              enter="transition ease-out duration-200"
              enterFrom="opacity-0 translate-y-1"
              enterTo="opacity-100 translate-y-0"
              leave="transition ease-in duration-150"
              leaveFrom="opacity-100 translate-y-0"
              leaveTo="opacity-0 translate-y-1"
            >
              <Popover.Panel
                static
                className="origin-top-right absolute z-10 right-0 mt-2 w-36 rounded-md shadow-lg bg-white dark:bg-gray-300 ring-1 ring-black ring-opacity-5 focus:outline-none"
              >
                <div className="py-1">
                  <Popover.Button>
                    {!user ? (
                      <button
                        onClick={() => setAuthModalOpen(true)}
                        className={`${
                          open ? `${activeClass}` : `${inactiveClass}`
                        } block px-4 py-2 text-sm text-gray-700 w-full text-left`}
                      >
                        Login
                      </button>
                    ) : (
                      <button
                        onClick={() => signOut()}
                        className={`${
                          open ? `${activeClass}` : `${inactiveClass}`
                        } block px-4 py-2 text-sm text-gray-700 w-full text-left`}
                      >
                        Logout
                      </button>
                    )}
                  </Popover.Button>
                  <Popover.Button>
                    <button
                      onClick={handleThemeToggle}
                      className={`${
                        open ? `${activeClass}` : `${inactiveClass}`
                      } block px-4 py-2 text-sm text-gray-700 w-full text-left`}
                    >
                      {theme === "light" ? "Dark" : "Light"} theme
                    </button>
                  </Popover.Button>
                </div>
              </Popover.Panel>
            </Transition>
          </>
        )}
      </Popover>
      <AuthModal {...authModalProps} />
    </>
  );
}
