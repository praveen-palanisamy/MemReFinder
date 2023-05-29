// Modal to handle authentication

import React, { useState } from "react";
import { signIn } from "next-auth/react";
import { Dialog, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";

export type AuthModalProps = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export function AuthModal(props: AuthModalProps) {
  const [error, setError] = useState("");

  const signInWithEmail = async ({ emailId }) => {
    try {
      const result = await signIn("email", {
        redirect: false,
        callbackUrl: window.location.href,
        email: emailId,
      });
      console.log("result:", result);
      if (result.error) {
        throw new Error(result.error);
      }
    } catch (error) {
      setError(error);
      alert("Unable to sign in");
    } finally {
      alert("Check your email and click on the link to sign in");
      props.setOpen(false);
    }
  };

  const signInWithGithub = async () => {
    try {
      const result = await signIn("github", {
        redirect: false,
        callbackUrl: window.location.href,
      });
      console.log("result:", result);
      if (result.error) {
        throw new Error(result.error);
      }
    } catch (error) {
      setError(error);
      alert("Unable to sign in");
    } finally {
      alert("Signed in");
      props.setOpen(false);
    }
  };

  return (
    <Transition.Root show={props.open} as={React.Fragment}>
      <Dialog
        as="div"
        static
        className="fixed z-10 inset-0 overflow-y-auto"
        open={props.open}
        onClose={() => props.setOpen(false)}
      >
        <div className="flex items-center justify-center min-h-screen">
          <Transition.Child
            as={React.Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-30" />
          </Transition.Child>

          <Transition.Child
            as={React.Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <div className="bg-white rounded-md p-4 w-96">
              <div className="flex flex-row justify-between">
                <Dialog.Title className="text-lg font-medium text-gray-900">
                  Sign in
                </Dialog.Title>
                <button
                  className="text-gray-500 hover:text-gray-600"
                  onClick={() => props.setOpen(false)}
                >
                  <XMarkIcon className="h-5" />
                </button>
              </div>
              <div className="mt-2">
                <p className="text-sm text-gray-500">
                  Sign in to save and restore your Embeddings.
                </p>
              </div>
              <div className="mt-4">
                <button
                  onClick={signInWithGithub}
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gray-800 hover:bg-gray-900"
                >
                  Sign in with Github
                </button>
              </div>
              <div className="mt-4">
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-300" />
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-2 bg-white text-gray-500">
                      Or continue with
                    </span>
                  </div>
                </div>
              </div>

              <div className="mt-4">
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    const emailId = e.currentTarget.emailId.value;
                    signInWithEmail({ emailId });
                  }}
                >
                  <div className="mt-1">
                    <input
                      id="emailId"
                      name="emailId"
                      type="email"
                      autoComplete="email"
                      required
                      className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      placeholder="Email address"
                    />
                  </div>
                  <div className="mt-4">
                    <button
                      type="submit"
                      className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
                    >
                      Sign in with Email
                    </button>
                  </div>
                </form>
              </div>
              {error && (
                <div className="mt-4">
                  <p className="text-sm text-red-500">{error}</p>
                </div>
              )}
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
