import { pipeline } from "@xenova/transformers";
import { EmbeddingOptions } from "./embeddings";

export interface Progress {
  status: string;
  name: string;
  file: string;
  progress?: number;
  loaded?: number;
  total?: number;
}
const progress_callback = (progress: Progress) => {
  console.log("transformers::progress_callback:", progress);
};
export async function embedding({
  input,
  model = "Xenova/all-MiniLM-L6-v2",
}: EmbeddingOptions) {
  // Create a new pipeline for Setence Embedding
  const createEmbedding = await pipeline("feature-extraction", model, {
    progress_callback,
  });
  const result = await createEmbedding(input, {
    pooling: "mean",
    normalize: false,
  });

  if (!result) {
    throw new Error("No embeddings returned from the pipeline");
  }

  console.log("transformers::embedding:", result.data);

  return result.data; // Float32Array(2688)
}
