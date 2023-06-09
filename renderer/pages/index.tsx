import Head from "next/head";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";

import FileQandAArea from "../components/FileQandAArea";
import { FileLite } from "../types/file";
import FileUploadArea from "../components/FileUploadArea";
import UserSettings from "../components/UserSettings";

export default function FileQandA() {
  const [files, setFiles] = useState<FileLite[]>([]);
  const { data: session, status } = useSession();
  const isLoadingUser = status === "loading";
  const [theme, setTheme] = useState<"light" | "dark">("light");

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  const bgColor = theme === "dark" ? "bg-slate-800" : "bg-white";
  const textColor = theme === "dark" ? "text-white" : "text-black";

  return (
    <div className={`flex h-screen bg-white dark:bg-slate-800`}>
      <Head>
        <title>MemReFinder</title>
      </Head>
      <div className={`w-full text-black dark:text-white`}>
        <h1 className="text-center text-4xl">
          MemReFinder: Chat with your Data
        </h1>

        <div className="text-gray dark:text-white">
          <center> Chat with your Documents and Files to find Answers.</center>
          <br />
        </div>
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
            <div
              className={`col-span-2 text-center text-white dark:text-black`}
            >
              <FileQandAArea files={files} />
            </div>
          </div>
        )}
      </div>
      <UserSettings session={session} theme={theme} toggleTheme={setTheme} />
    </div>
  );
}
