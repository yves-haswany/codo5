import { ContentfulContentSource } from '@stackbit/cms-contentful';

import { defineStackbitConfig } from '@stackbit/types';

export default defineStackbitConfig({
    "stackbitVersion": "~0.6.0",
    "nodeVersion": "18",
    "ssgName": "nextjs",
    "contentSources": [
        new ContentfulContentSource({
            spaceId: process.env.CONTENTFUL_SPACE_ID!,
            environment: process.env.CONTENTFUL_ENVIRONMENT || 'master',
            accesssToken:process.env.CONTENFUL_ACCESS_TOKEN,
            previewToken: process.env.CONTENTFUL_PREVIEW_TOKEN!,
            managementToken: process.env.CONTENTFUL_MANAGEMENT_TOKEN!
        }),
    ],
    "postInstallCommand": "npm i --no-save @stackbit/types @stackbit/cms-contentful"
})
import { defineStackbitConfig } from "@stackbit/types";
import { ContentfulContentSource } from "@stackbit/cms-contentful";

export default defineStackbitConfig({
  stackbitVersion: "~0.6.0",
  ssgName: "nextjs",
  nodeVersion: "16",
  contentSources: [
    new ContentfulContentSource({
      spaceId: process.env.CONTENTFUL_SPACE_ID!,
      environment: process.env.CONTENTFUL_ENVIRONMENT!,
      previewToken: process.env.CONTENTFUL_PREVIEW_TOKEN!,
      accessToken: process.env.CONTENTFUL_MANAGEMENT_TOKEN!,
      useWebhookForContentUpdates: true,
    })
  ],
  export default defineStackbitConfig({
  contentSources: [ Contentful ]
  modelExtensions: [{ name: 'Invoice', type: 'Invoice', urlPath: 'https://app.contentful.com/spaces/j86lyi7eedea/entries/3XRlzjcnVHCN5lGoe65L0q' }],
  // other properties ...
})
});
