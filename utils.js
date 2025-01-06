import { uniqueNamesGenerator, adjectives, animals, NumberDictionary } from 'unique-names-generator';

/*
Get the actual size of a resource downloaded by the browser (e.g. an image) in bytes.
This is supported in recent versions of all major browsers, with some caveats.
See https://developer.mozilla.org/en-US/docs/Web/API/PerformanceResourceTiming/encodedBodySize
*/
export function getResourceSize(url) {
    const entry = window?.performance?.getEntriesByName(url)?.[0];
    if (entry) {
        const size = entry?.encodedBodySize;
        return size || undefined;
    } else {
        return undefined;
    }
}

// Note: this only works on the server side
export function getNetlifyContext() {
    return process.env.CONTEXT;
}

export function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

const uniqueNamesConfig = {
    dictionaries: [adjectives, animals],
    separator: '-',
    length: 2
};

export function uniqueName() {
    return uniqueNamesGenerator(uniqueNamesConfig) + "-" + randomInt(100, 999);
}

export const uploadDisabled = process.env.NEXT_PUBLIC_DISABLE_UPLOADS?.toLowerCase() === "true";
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
