import { NextApiRequest, NextApiResponse } from "next";
import { authOptions } from "./auth/[...nextauth]";
import { getServerSession } from "next-auth/next";
import { supabase } from "../../lib/supabaseClient";
import { FileLite } from "../../types/file";
import { PrismaClient, User } from "@prisma/client";

const prisma = new PrismaClient()
// TODO use prisma instaed of supabase directly
const storeEmbeddings = async (fileObject: FileLite, user: User) => {

    const { name, url, type, size, extractedText, embedding, chunks } = fileObject

    const { data, error } = await supabase.from('File').insert({
        name,
        url,
        type,
        size,
        extractedText,
        meanEmbedding: embedding,
        userId: user.id
    }).select('id')

    const file_id = data[0].id

    console.log("File stored with file_id:", file_id)
    console.log("error:", error)

    const { error: error2 } = await supabase.from('TextEmbedding').insert(chunks.map((chunk) => ({
        text: chunk.text,
        embedding: chunk.embedding,
        fileId: file_id
    })))
    console.log("Embeddings stored")
    console.log("Error:", error2)
}

export const config = {
    api: {
        bodyParser: {
            sizeLimit: '25mb',
        },
    }
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    // Check if user is authenticated
    const session = await getServerSession(req, res, authOptions )
    console.log("store-emb::session:", session)
    if (!session) {
        res.status(401).json({ error: "Unauthorized. User needs to Login" });
        return;
    }
    if (req.method !== "POST") {
        res.status(405).json({ error: `HTTP method ${req.method} not allowed` });
        return;
    }

    const fileObject = req.body
    const user = await prisma.user.findUnique({
        where: { email: session.user.email }
    });
    await storeEmbeddings(fileObject, user)
    res.status(200).json({ message: "Embeddings stored" })
}

