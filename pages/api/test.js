import { createClient } from "contentful";

export default async function handler(req, res) {
  // Validate environment variables
  const spaceId = process.env.CONTENTFUL_SPACE_ID;
  const accessToken = process.env.CONTENTFUL_MANAGEMENT_TOKEN;

  if (!spaceId || !accessToken) {
    return res.status(500).json({
      error: "Missing Contentful environment variables. Please check your configuration.",
    });
  }

  // Create Contentful client
  const client = createClient({
    space: spaceId,
    accessToken: accessToken,
  });

  try {
    // Fetch entries from Contentful
    const entries = await client.getEntries();
    res.status(200).json(entries);
  } catch (error) {
    console.error("Error fetching entries:", error); // Log the error for debugging
    res.status(500).json({ error: error.message });
  }
}
