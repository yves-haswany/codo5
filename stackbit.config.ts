import { defineStackbitConfig } from '@stackbit/types';
import { ContentfulContentSource } from '@stackbit/cms-contentful';

export default defineStackbitConfig({
    stackbitVersion: "~0.6.0",
    nodeVersion: "20.18.1",
    ssgName: "nextjs",
    contentSources: [
        new ContentfulContentSource({
            name: 'contentful',
            type: '@stackbit/cms-contentful',
            spaceId: process.env.CONTENTFUL_SPACE_ID!,
            environment: process.env.CONTENTFUL_ENVIRONMENT! || 'master',
            previewToken: process.env.CONTENTFUL_PREVIEW_TOKEN!,
            accessToken: process.env.CONTENTFUL_MANAGEMENT_TOKEN!!,
            
            useWebhookForContentUpdates: true
        }) // Corrected: Closing the configuration object properly
    ],
    modelExtensions: [
        {
            name: "homePage",
            type: "page",
            urlPath: "/{slug}"
        }
    ],
     siteMap: ({ documents, models }) => {
    // 1. Filter all page models which were defined in modelExtensions
    const pageModels = models.filter((m) => m.type === "page")

    return documents
      // 2. Filter all documents which are of a page model
      .filter((d) => pageModels.some(m => m.name === d.modelName))
      // 3. Map each document to a SiteMapEntry
      .map((document) => {
        // Map the model name to its corresponding URL
        const urlModel = (() => {
            switch (document.modelName) {
                case 'Page':
                    return 'otherPage';
                default:
                    return null;
            }
        })();

        return {
          stableId: document.id,
          urlPath: `/${urlModel}/${document.id}`,
          document,
          isHomePage: document.modelName === 'homePage',
        };
      })
      .filter(Boolean) as SiteMapEntry[];
  }
    postInstallCommand: "npm i --no-save @stackbit/types @stackbit/cms-contentful"
});
