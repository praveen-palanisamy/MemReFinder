import Head from "next/head";
import UserSettings from "../components/UserSettings";

export default function Layout({ children }) {
  // const [theme, setTheme] = useState<"light" | "dark">("light");

  return (
    <>
      <Head>
        <title> MemReFinder</title>
      </Head>
      <div className={`flex min-h-screen bg-white dark:bg-slate-800`}>
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
              <UserSettings />
            </div>
          </div>

          <main>{children}</main>
        </div>
      </div>
    </>
  );
}
