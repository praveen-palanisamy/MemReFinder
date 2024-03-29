import React, { memo, useCallback, useRef, useState, useContext } from "react";
import { Transition } from "@headlessui/react";
import axios from "axios";
import ReactMarkdown from "react-markdown";

import FileViewerList from "./FileViewerList";
import LoadingText from "./LoadingText";
import { isFileNameInString } from "../services/utils";
import { FileChunk, FileLite } from "../types/file";
import { AppContext } from "@/pages/_app";

type FileQandAAreaProps = {
  files: FileLite[];
};

function FileQandAArea(props: FileQandAAreaProps) {
  const questionRef = useRef(null);
  const [hasAskedQuestion, setHasAskedQuestion] = useState(false);
  const [answerError, setAnswerError] = useState("");
  const [answerLoading, setAnswerLoading] = useState<boolean>(false);
  const [answer, setAnswer] = useState("");
  const [answerDone, setAnswerDone] = useState(false);
  const { mode } = useContext(AppContext);

  const handleSearch = useCallback(async () => {
    if (answerLoading) {
      return;
    }

    const question = (questionRef?.current as any)?.value ?? "";
    setAnswer("");
    setAnswerDone(false);

    if (!question) {
      setAnswerError("Please ask a question.");
      return;
    }
    if (props.files.length === 0) {
      setAnswerError("Please choose file(s) before asking a question.");
      return;
    }

    setAnswerLoading(true);
    setAnswerError("");

    let results: FileChunk[] = [];

    try {
      const searchResultsResponse = await axios.post(
        "/api/search-file-chunks",
        {
          searchQuery: question,
          files: props.files,
          maxResults: 10,
          mode,
        }
      );

      if (searchResultsResponse.status === 200) {
        results = searchResultsResponse.data.searchResults;
      } else {
        setAnswerError("Sorry, something went wrong!");
        // Throw error and handle appropriately
        throw new Error(`Error:${searchResultsResponse.status}`);
      }
    } catch (err: any) {
      setAnswerLoading(false);
      setAnswerError("Try again");
      return;
    }

    setHasAskedQuestion(true);

    const res = await fetch("/api/get-answer-from-files", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        question,
        fileChunks: results,
      }),
    });
    const reader = res.body!.getReader();

    while (true) {
      const { done, value } = await reader.read();
      if (done) {
        setAnswerDone(true);
        break;
      }
      setAnswer((prev) => prev + new TextDecoder().decode(value));
    }

    setAnswerLoading(false);
  }, [props.files, answerLoading]);

  const handleEnterInSearchBar = useCallback(
    async (event: React.SyntheticEvent) => {
      if ((event as any).key === "Enter") {
        await handleSearch();
      }
    },
    [handleSearch]
  );

  return (
    <div className="space-y-4 text-gray-800 dark:text-white">
      <div className="flex justify-center ring mx-4">
        {answerError && <div className="text-red-500">{answerError}</div>}
        <Transition
          show={hasAskedQuestion}
          enter="transition duration-600 ease-out"
          enterFrom="transform opacity-0"
          enterTo="transform opacity-100"
          leave="transition duration-125 ease-out"
          leaveFrom="transform opacity-100"
          leaveTo="transform opacity-0"
          className="mb-2"
        >
          {answer && (
            <div className="">
              <ReactMarkdown className="prose" linkTarget="_blank">
                {`${answer}${answerDone ? "" : "  |"}`}
              </ReactMarkdown>
            </div>
          )}

          <Transition
            show={
              props.files.filter((file) =>
                isFileNameInString(file.name, answer)
              ).length > 0
            }
            enter="transition duration-600 ease-out"
            enterFrom="transform opacity-0"
            enterTo="transform opacity-100"
            leave="transition duration-125 ease-out"
            leaveFrom="transform opacity-100"
            leaveTo="transform opacity-0"
            className="mb-2"
          >
            <FileViewerList
              files={props.files.filter((file) =>
                isFileNameInString(file.name, answer)
              )}
              title="Sources"
              listExpanded={true}
            />
          </Transition>
        </Transition>
      </div>
      <div className="text-center">
        2. Ask a question based on the content of your files:
      </div>
      <div className="space-y-2">
        <textarea
          className="border rounded bg-gray-50 dark:bg-slate-800 border-gray-200 w-3/4 h-auto py-1 px-2"
          placeholder="e.g. Why did my utility bills increase this month?"
          name="search"
          ref={questionRef}
          onKeyDown={handleEnterInSearchBar}
        />
        <div className="flex justify-center">
          <div
            className="rounded-md bg-gray-50 dark:bg-slate-800 py-1 px-4 w-max text-gray-500 dark:text-white hover:bg-gray-100 dark:hover:bg- border border-gray-100 shadow cursor-pointer"
            onClick={handleSearch}
          >
            {answerLoading ? (
              <LoadingText text="Answering question..." />
            ) : (
              "Ask"
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default memo(FileQandAArea);
