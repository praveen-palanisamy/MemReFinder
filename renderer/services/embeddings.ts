import { embedding as openaiEmbedding } from "./openai";
import { embedding as transformersEmbedding } from "./transformers";

export type EmbeddingOptions = {
  input: string | string[];
  model?: string;
  modelOutputDims?: number;
  mode?: "local" | "cloud" | "hybrid";
};

export async function embedding({
  input,
  model = "text-embedding-ada-002",
  mode = "cloud",
  modelOutputDims = 1536,
}: EmbeddingOptions): Promise<number[][]> {
  if (mode === "hybrid" || mode === "local") {
    model = "Xenova/all-MiniLM-L6-v2";
    modelOutputDims = 384;
    return transformersEmbedding({ input, model, modelOutputDims });
  }
  if (mode === "cloud") {
    return openaiEmbedding({ input, model });
  }
}
