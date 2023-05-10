import Head from "next/head";
import { useState } from "react";

import FileQandAArea from "../components/FileQandAArea";
import { FileLite } from "../types/file";
import FileUploadArea from "../components/FileUploadArea";
import UserSettings from "../components/UserSettings";

export default function FileQandA() {
  const [files, setFiles] = useState<FileLite[]>([]);

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
              <UserSettings />
            </div>
          </div>
          <div className="col-span-2 text-center">
            <FileQandAArea files={files} />
          </div>
        </div>
      </div>
    </div>
  );
}
