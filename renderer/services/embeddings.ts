import { embedding as openaiEmbedding } from "./openai";
import { embedding as transformersEmbedding } from "./transformers";

export type EmbeddingOptions = {
  input: string | string[];
  model?: string;
  mode?: "local" | "cloud" | "hybrid";
};

export async function embedding({
  input,
  model = "text-embedding-ada-002",
  mode = "cloud",
}: EmbeddingOptions): Promise<number[][]> {
  if (mode === "hybrid" || mode === "local") {
    model = "Xenova/all-MiniLM-L6-v2";
    return transformersEmbedding({ input, model }); // Float32Array(2688)
  }
  if (mode === "cloud") {
    return openaiEmbedding({ input, model });
  }
}
