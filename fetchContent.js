require('dotenv').config();
const contentful = require('contentful');

// Create a Contentful client instance
const client = contentful.createClient({
  space: process.env.CONTENTFUL_SPACE_ID!,
  accessToken: process.env.CONTENTFUL_MANAGEMENT_TOKEN!,  // For published content
  environment: process.env.CONTENTFUL_ENVIRONMENT!,
});

// Fetch content
client.getEntries()
  .then(entries => {
    console.log(entries.items);  // Display content entries
  })
  .catch(err => {
    console.error('Error fetching content from Contentful:', err);
  });
