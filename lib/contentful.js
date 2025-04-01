// lib/contentful.js
import { createClient } from 'contentful';

// Initialize Contentful client
const client = createClient({
  space: process.env.CONTENTFUL_SPACE_ID,
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
  // environment: process.env.CONTENTFUL_ENV || 'master', // Uncomment if using environments
});

/**
 * Fetches the home page content with proper field handling
 */
export async function fetchHomePageContent() {
  try {
    const response = await client.getEntries({
      content_type: 'homePage',
      limit: 1,
      include: 2, // Includes linked assets (for featuredImage)
    });

    if (!response.items.length) return null;

    const rawData = response.items[0].fields;

    // Process the data to handle JSON fields and images
    return {
      title: rawData.title || '',
      slug: rawData.slug || '/',
      description: rawData.description || '',
      featuredImage: rawData.featuredImage 
        ? {
            url: `https:${rawData.featuredImage.fields.file.url}`,
            alt: rawData.featuredImage.fields.title || '',
            width: rawData.featuredImage.fields.file.details.image.width,
            height: rawData.featuredImage.fields.file.details.image.height,
          }
        : null,
      sections: parseJsonField(rawData.sections),
      footer: parseJsonField(rawData.footer),
    };
  } catch (error) {
    console.error('Error fetching home page content:', error);
    return null;
  }
}

/**
 * Helper function to safely parse JSON fields
 */
function parseJsonField(jsonString) {
  if (!jsonString) return null;
  
  try {
    return JSON.parse(jsonString);
  } catch (e) {
    console.error('Error parsing JSON field:', e);
    return null;
  }
}

/**
 * Fetches a specific entry by slug and content type
 */
export async function getEntryBySlug(contentType, slug) {
  try {
    const entries = await client.getEntries({
      content_type: contentType,
      'fields.slug': slug,
      limit: 1,
      include: 3,
    });

    if (!entries.items.length) return null;

    return processContentfulEntry(entries.items[0]);
  } catch (error) {
    console.error(`Error fetching ${contentType} with slug ${slug}:`, error);
    return null;
  }
}

/**
 * Processes a Contentful entry to handle common field types
 */
function processContentfulEntry(entry) {
  const fields = entry.fields;
  const processed = { ...fields };

  // Process all JSON fields automatically
  Object.keys(fields).forEach(key => {
    if (typeof fields[key] === 'string' && looksLikeJson(fields[key])) {
      processed[key] = parseJsonField(fields[key]);
    }
  });

  // Process image fields
  if (fields.featuredImage) {
    processed.featuredImage = {
      url: `https:${fields.featuredImage.fields.file.url}`,
      alt: fields.featuredImage.fields.title || '',
      dimensions: fields.featuredImage.fields.file.details.image,
    };
  }

  return {
    ...processed,
    contentType: entry.sys.contentType.sys.id,
    id: entry.sys.id,
  };
}

/**
 * Helper to detect JSON strings
 */
function looksLikeJson(str) {
  return str.trim().startsWith('{') || str.trim().startsWith('[');
}

/**
 * Gets all entries of a content type for listing pages
 */
export async function getAllEntries(contentType) {
  try {
    const entries = await client.getEntries({
      content_type: contentType,
      include: 2,
      limit: 1000, // Adjust based on your needs
    });

    return entries.items.map(entry => processContentfulEntry(entry));
  } catch (error) {
    console.error(`Error fetching all ${contentType} entries:`, error);
    return [];
  }
}
