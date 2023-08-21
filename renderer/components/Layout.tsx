import { useEffect, useState } from "react";
import UserSettings from "../components/UserSettings";
export default function Layout({ children, session, ...pageProps }) {
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const bgColor = theme === "dark" ? "bg-slate-800" : "bg-white";
  const textColor = theme === "dark" ? "text-white" : "text-black";
  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  return (
    <>
      <div className={`flex h-screen bg-white dark:bg-slate-800`}>
        <div className={`w-full text-black dark:text-white`}>
          <div className="grid grid-cols-12">
            <div className="col-span-11">
              <h1 className="text-center text-4xl">
                MemReFinder: Chat with your Data
              </h1>
              <div className="text-gray text-center dark:text-white">
                Chat with your Documents and Files to find Answers.
              </div>
            </div>
            <div className="flex justify-center items-center">
              <UserSettings
                session={session}
                theme={theme}
                toggleTheme={setTheme}
              />
            </div>
          </div>

          <main>{children}</main>
        </div>
      </div>
    </>
  );
}
