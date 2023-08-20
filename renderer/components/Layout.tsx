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
          <h1 className="text-center text-4xl">
            MemReFinder: Chat with your Data
          </h1>
          <div className="text-gray dark:text-white">
            <center>
              {" "}
              Chat with your Documents and Files to find Answers.
            </center>
            <div className="flex justify-end">
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
