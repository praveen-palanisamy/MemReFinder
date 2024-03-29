import { AppContext } from "@/pages/_app";
import { useContext } from "react";

interface AppMode {
  mode: "Cloud" | "Hybrid" | "Local";
  description: string[];
  button: string;
  badges?: string[];
  imageSrc?: string;
}

export default function WelcomePage() {
  const { setMode } = useContext(AppContext);
  const onlineMode: AppMode = {
    mode: "Cloud",
    description: [
      "Leverage cloud services to process your data.",
      "Use powerful AI models running in the cloud.",
      "Low compute and memory requirements.",
      "Requires an OpenAI API Key",
      "(optional) Sign-in to Save and Resume your work across sessions and devices. ",
    ],
    button: "Start",
    badges: ["OpenAI API Key required"],
    imageSrc: "/images/cloud.png",
  };
  const hybridMode: AppMode = {
    mode: "Hybrid",
    description: [
      "Process your data locally. Share minimal context data to get specific answers. Your documents and files never leave your device.",
      "Use powerful AI models running in the cloud.",
      "Medium compute and memory requirements depending on your data type and volume.",
      "Requires an OpenAI API Key",
      "(optional) Sign-in to Save and Resume your work across sessions and devices. ",
    ],
    button: "Start",
    badges: ["OpenAI API Key required"],
    imageSrc: "/images/hybrid.png",
  };
  const offlineMode: AppMode = {
    mode: "Local",
    description: [
      "Process your data locally. No data leaves your device.",
      "Run models locally on your own hardware.",
      "High compute and memory requirements.",
      "No OpenAI API Key required.",
      "(optional) Sign-in to Save and Resume your work across sessions and devices. ",
    ],
    button: "Coming Soon...",
    imageSrc: "/images/local.png",
  };

  const appModes: AppMode[] = [onlineMode, hybridMode, offlineMode];

  return (
    <div className="flex flex-col justify-center items-center">
      <h1 className="text-center text-4xl"> Welcome! </h1>
      <h2 className="text-center">
        Choose the mode that best suits your needs:
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {appModes.map((mode, index) => (
          <div key={`${mode.mode}${index}`} className="col-span-1">
            <div className="card w-96 glass">
              <figure>
                <img
                  src={mode.imageSrc ? mode.imageSrc : "/images/welcome-bg.jpg"}
                  alt="car!"
                />
              </figure>
              <div className="card-body">
                <h2 className="card-title justify-center"> {mode.mode}</h2>

                <ul className="list-disc">
                  {mode.description.map((line, index) => (
                    <li key={`${mode.mode}${index}`}>{line}</li>
                  ))}
                </ul>
                {mode.badges && (
                  <div className="card-badge">
                    {mode.badges.map((badge, index) => (
                      <span
                        key={`${mode.mode}${index}`}
                        className="badge badge-accent"
                      >
                        {badge}
                      </span>
                    ))}
                  </div>
                )}
                <div className="card-actions justify-center">
                  <button
                    className="btn btn-primary"
                    onClick={() => {
                      console.log(`Setting mode to: ${mode.mode}`);
                      setMode(
                        mode.mode.toLowerCase() as "cloud" | "hybrid" | "local"
                      );
                    }}
                  >
                    {mode.button}
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
