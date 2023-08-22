import FileQandA from "@/components/FileQandA";
import WelcomePage from "@/components/WelcomePage";
import { AppContext } from "./_app";
import { useContext } from "react";

export default function Main() {
  const { mode } = useContext(AppContext);
  const supportedModes = ["cloud"];
  return (
    <div className="flex flex-col items-center justify-center min-h-full">
      {mode === "cloud" && <FileQandA />}
      {mode === "" && <WelcomePage />}
      {!supportedModes.includes(mode) && <WelcomePage />}
    </div>
  );
}
