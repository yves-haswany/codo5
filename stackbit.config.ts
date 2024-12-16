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
      useWebhookForContentUpdates: true
    })
  ],
  models: {
    page: { type: "page", urlPath: "/{slug}" }
  }
});
export default defineStackbitConfig({
  contentSources: [Contentful]
  modelExtensions: [{ name: 'invoice', type: 'invoice', urlPath: '/{slug}' }],
  // other properties ...
}
export default defineStackbitConfig({
  contentSources: [Contentful]
  modelExtensions: {
    {
      name: 'hero_section',
      fields: [
        {
          type: 'Date/Time',
          name: 'Start Date',
          label: 'Start_Date',
          group: 'design',
          controlType: 'button-group',
          options: [
            { label: 'Narrow', value: 'narrow' },
            { label: 'Wide', value: 'wide' },
            { label: 'Full', value: 'full' },
          ],
        },
      ],
    },
  },
  // other properties ...
})
