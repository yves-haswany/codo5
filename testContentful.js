 const contentful = require('contentful');

   // Initialize the Contentful client
   const client = contentful.createClient({
     space: process.env.CONTENTFUL_SPACE_ID,
     accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
     environment: process.env.CONTENTFUL_ENVIRONMENT || 'master',
   });

   // Fetch entries to test the connection
   client
     .getEntries()
     .then((entries) => console.log('Contentful connection successful:', entries.items))
     .catch((error) => console.error('Error connecting to Contentful:', error.message));
