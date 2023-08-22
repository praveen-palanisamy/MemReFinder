import FileQandA from "@/components/FileQandA";
import WelcomePage from "@/components/WelcomePage";
import { AppContext } from "./_app";
import { useContext } from "react";

export default function Main() {
  const { mode } = useContext(AppContext);
  const supportedModes = ["cloud"];
  return (
    <div className="flex flex-col justify-center min-h-screen">
      {mode === "cloud" && <FileQandA />}
      {mode === "" && <WelcomePage />}
      {!supportedModes.includes(mode) && <WelcomePage />}
    </div>
  );
}
