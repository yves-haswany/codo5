require('dotenv').config();
const contentful = require('contentful'); // Content Delivery API

const client = contentful.createClient({
  space: process.env.CONTENTFUL_SPACE_ID,
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
});

(async () => {
  try {
    const entries = await client.getEntries();
    console.log('Contentful entries fetched successfully:', entries.items);
  } catch (err) {
    console.error('Error connecting to Contentful:', err.message);
  }
})();
