import {supabase } from "../lib/supabaseClient";
import {FileLite } from "../types/file";


export const storeEmbeddings = async (fileObject: FileLite) => {

    console.log("storeEmbeddings:", fileObject)
    const {name, url, type, size, extractedText, embedding, chunks} = fileObject

    const {error} = await supabase.from('files').insert({
       name,
       url,
       type,
       size,
       extracted_text: extractedText,
       mean_embedding: embedding,
       chunks,
    })
    console.log("Embeddings stored")
    console.log("Error: ", error)
}
