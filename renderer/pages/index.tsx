import Head from "next/head";
import { useState } from "react";

import FileQandAArea from "../components/FileQandAArea";
import { FileLite } from "../types/file";
import FileUploadArea from "../components/FileUploadArea";
import { AuthModal, AuthModalProps } from "../components/AuthModal";
import { Cog8ToothIcon } from "@heroicons/react/24/solid";

export default function FileQandA() {
  const [files, setFiles] = useState<FileLite[]>([]);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const authModalProps: AuthModalProps = {
    open: authModalOpen,
    setOpen: setAuthModalOpen,
  };
  return (
    <div className="flex h-screen flex-col">
      <Head>
        <title>MemReFinder</title>
      </Head>
      <div className="text-gray-800">
        <h1 className="text-center text-4xl">
          MemReFinder: Chat with your Data
        </h1>

        <div className="">
          <center> Chat with your Documents and Files to find Answers.</center>
          <br />
        </div>
        <div className="grid grid-flow-row-dense grid-cols-3 grid-gap">
          <div className="col-span-1 text-center">
            {" "}
            1. Load your files:
            <FileUploadArea
              handleSetFiles={setFiles}
              maxNumFiles={100}
              maxFileSizeMB={25}
            />
            <div className="absolute bottom-0 left-0">
              <button
                className="btn btn-primary"
                onClick={() => setAuthModalOpen(true)}
              >
                <Cog8ToothIcon className="h-5 w-5" />
              </button>
            </div>
            <AuthModal {...authModalProps} />
          </div>
          <div className="col-span-2 text-center">
            <FileQandAArea files={files} />
          </div>
        </div>
      </div>
    </div>
  );
}
