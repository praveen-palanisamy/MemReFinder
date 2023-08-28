import { pipeline, env } from "@xenova/transformers";
import { EmbeddingOptions } from "./embeddings";

export interface Progress {
  status: string;
  name: string;
  file: string;
  progress?: number;
  loaded?: number;
  total?: number;
}

// TODO: Show progress bars in the UI
const progress_callback = (progress: Progress) => {
  console.log("transformers::progress_callback:", progress);
};
// Save the models in renderer/public/cache/*
env.localModelPath = "renderer/public/models";
env.cacheDir = "renderer/public/cache";

export async function embedding({
  input,
  model = "Xenova/all-MiniLM-L6-v2",
  modelOutputDims = 384,
}: EmbeddingOptions) {
  // Create a new pipeline for Setence Embedding
  const createEmbedding = await pipeline("feature-extraction", model, {
    progress_callback,
  });
  const batchSize = Array.isArray(input) ? input.length : 1;

  console.log("transformers::input.length:", input.length);
  console.log("transformers::batchSize:", batchSize);
  const result = await createEmbedding(input, {
    pooling: "mean",
    normalize: true,
  });

  if (!result) {
    throw new Error("No embeddings returned from the pipeline");
  }

  // Float32Array() does not have a reduce() method needed in searchFileChunks.ts
  // Convert Float32Array(...) to number[batchSize][modelOutputDims]
  const resultArray = [...result.data]; // Convert Float32Array() to number[]
  let transformedResult = [];
  for (let i = 0; i < batchSize; i += 1) {
    // Add the next modelOutputDims elements to the transformedResult array
    transformedResult.push(
      resultArray.slice(i * modelOutputDims, (i + 1) * modelOutputDims)
    );
  }

  return transformedResult;
}
