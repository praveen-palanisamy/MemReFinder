import {supabase } from "../lib/supabaseClient";
import {FileLite } from "../types/file";


export const storeEmbeddings = async (fileObject: FileLite) => {

    const {name, url, type, size, extractedText, embedding, chunks} = fileObject

    const {data, error} = await supabase.from('File').insert({
       name,
       url,
       type,
       size,
       extractedText,
       meanEmbedding: embedding,
    }).select('id')

    const file_id = data[0].id

    console.log("File stored with file_id:", file_id)
    console.log("error:", error)

    const {error: error2} = await supabase.from('TextEmbedding').insert(chunks.map((chunk) => ({
        text: chunk.text,
        embedding: chunk.embedding,
        fileId: file_id
    })))
    console.log("Embeddings stored")
    console.log("Error:", error2)
}
