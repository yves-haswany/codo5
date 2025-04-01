// lib/api.js
import { createClient } from 'contentful';

// Initialize Contentful client
const client = createClient({
  space: process.env.CONTENTFUL_SPACE_ID,
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
  // environment: 'master', // Uncomment if using specific environment
});

/**
 * Fetches a single entry by content type
 * @param {string} contentType - Contentful content type ID
 * @param {object} options - Additional query options
 */
export async function getEntryByType(contentType, options = {}) {
  try {
    const entries = await client.getEntries({
      content_type: contentType,
      include: 3, // Include linked entries up to 3 levels deep
      ...options,
    });
    return entries?.items?.[0]?.fields || null;
  } catch (error) {
    console.error(`Error fetching ${contentType}:`, error);
    return null;
  }
}

/**
 * Gets all content slugs for static paths generation
 */
export async function getAllContentSlugs() {
  try {
    // Adjust content types as needed
    const contentTypes = ['homePage', 'page', 'blogPost']; 
    const allSlugs = [];

    for (const type of contentTypes) {
      const entries = await client.getEntries({
        content_type: type,
        select: 'fields.slug',
        limit: 1000,
      });
      entries.items.forEach(entry => {
        allSlugs.push({
          contentType: type,
          slug: entry.fields.slug || '/',
        });
      });
    }

    return allSlugs;
  } catch (error) {
    console.error('Error fetching slugs:', error);
    return [];
  }
}

/**
 * Gets static props for content based on slug
 * @param {string} slug - The content slug to fetch
 */
export async function getStaticPropsForContent(slug) {
  try {
    // Handle homepage case
    if (slug === '/') {
      return getEntryByType('homePage', { limit: 1 });
    }

    // Find content by slug
    const entries = await client.getEntries({
      'fields.slug': slug,
      limit: 1,
      include: 3,
    });

    if (!entries.items.length) return null;

    return {
      ...entries.items[0].fields,
      contentType: entries.items[0].sys.contentType.sys.id,
    };
  } catch (error) {
    console.error(`Error fetching content for slug ${slug}:`, error);
    return null;
  }
}

/**
 * Specialized function for home page
 */
export async function getHomePageContent() {
  const homePage = await getEntryByType('homePage', { limit: 1 });
  
  if (!homePage) return null;

  // Process sections JSON if needed
  if (homePage.sections && typeof homePage.sections === 'string') {
    try {
      homePage.sections = JSON.parse(homePage.sections);
    } catch (e) {
      console.error('Error parsing sections JSON:', e);
      homePage.sections = [];
    }
  }

  // Process footer JSON if needed
  if (homePage.footer && typeof homePage.footer === 'string') {
    try {
      homePage.footer = JSON.parse(homePage.footer);
    } catch (e) {
      console.error('Error parsing footer JSON:', e);
      homePage.footer = [];
    }
  }

  return homePage;
}

/**
 * Gets all entries of a specific content type
 */
export async function getAllEntries(contentType, options = {}) {
  try {
    const entries = await client.getEntries({
      content_type: contentType,
      include: 2,
      ...options,
    });
    return entries.items.map(item => ({
      ...item.fields,
      id: item.sys.id,
    }));
  } catch (error) {
    console.error(`Error fetching ${contentType} entries:`, error);
    return [];
  }
}
