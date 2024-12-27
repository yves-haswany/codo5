 import { createClient } from "contentful";

     export default async function handler(req, res) {
       const client = createClient({
         space: process.env.CONTENTFUL_SPACE_ID!,
         accessToken: process.env.CONTENTFUL_ACCESS_TOKEN!,
       });

       try {
         const entries = await client.getEntries();
         res.status(200).json(entries);
       } catch (error) {
         res.status(500).json({ error: error.message });
       }
     }
     
