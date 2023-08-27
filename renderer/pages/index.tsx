import FileQandA from "@/components/FileQandA";
import WelcomePage from "@/components/WelcomePage";
import { AppContext } from "./_app";
import { useContext } from "react";

export default function Main() {
  const { mode } = useContext(AppContext);
  const supportedModes = ["", "cloud", "hybrid"];
  return (
    <div className="">
      {mode === "cloud" || (mode === "hybrid" && <FileQandA />)}
      {mode === "" && <WelcomePage />}
      {!supportedModes.includes(mode) && <WelcomePage />}
    </div>
  );
}
