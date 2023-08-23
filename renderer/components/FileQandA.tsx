import { useState } from "react";
import { useSession } from "next-auth/react";

import FileQandAArea from "../components/FileQandAArea";
import { FileLite } from "../types/file";
import FileUploadArea from "../components/FileUploadArea";

export default function FileQandA() {
  const [files, setFiles] = useState<FileLite[]>([]);
  const { data: session, status } = useSession();
  const isLoadingUser = status === "loading";
  return (
    <div className="flex flex-col justify-center align-center min-h-screen">
      {!isLoadingUser && (
        <div
          className={`grid grid-flow-row-dense grid-cols-3 grid-gap bg-white dark:bg-slate-800`}
        >
          <div className={`col-span-1 text-center text-gray dark:text-white`}>
            {" "}
            1. Load your files:
            <FileUploadArea
              handleSetFiles={setFiles}
              maxNumFiles={100}
              maxFileSizeMB={25}
              session={session}
            />
          </div>
          <div className={`col-span-2 text-center text-white dark:text-black`}>
            <FileQandAArea files={files} />
          </div>
        </div>
      )}
      {isLoadingUser && (
        <div className="text-center">
          <div className="text-2xl">Loading...</div>
        </div>
      )}
    </div>
  );
}
