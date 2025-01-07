require('dotenv').config(); // Load environment variables

   const contentful = require('contentful');

   // Retrieve the access token and space ID from environment variables
   const accessToken = process.env.CONTENTFUL_ACCESS_TOKEN;
   const space = process.env.CONTENTFUL_SPACE_ID;

   // Check if the environment variables are set
   if (!accessToken || !space) {
     console.error('Error: CONTENTFUL_ACCESS_TOKEN or CONTENTFUL_SPACE_ID is missing in the environment variables.');
     process.exit(1);
   }

   // Create the Contentful client
   const client = contentful.createClient({
     space: space,
     accessToken: accessToken,
   });

   // Test the Contentful connection
   (async () => {
     try {
       const entries = await client.getEntries();
       console.log('Successfully connected to Contentful!');
       console.log('Entries:', entries.items);
     } catch (error) {
       console.error('Error fetching entries:', error.message);
     }
   })();

