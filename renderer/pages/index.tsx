import Head from "next/head";
import { useState } from "react";

import FileQandAArea from "../components/FileQandAArea";
import { FileLite } from "../types/file";
import FileUploadArea from "../components/FileUploadArea";

export default function FileQandA() {
  const [files, setFiles] = useState<FileLite[]>([]);

  return (
    <div className="flex items-left text-left h-screen flex-col">
      <Head>
        <title>MemReFinder</title>
      </Head>
      <div className="max-w-3xl mx-auto m-8 space-y-8 text-gray-800">
        <h1 className="text-4xl">MemReFinder: Chat with your Data</h1>

        <div className="">
          Search for answers from the content in your files.
          <br />
          1. Load your files: 
        </div>

        <FileUploadArea
          handleSetFiles={setFiles}
          maxNumFiles={100}
          maxFileSizeMB={25}
        />

        <FileQandAArea files={files} />
      </div>
    </div>
  );
}
