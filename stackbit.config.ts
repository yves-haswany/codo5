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
            managementToken: process.env.CONTENTFUL_MANAGEMENT_TOKEN!,
            useWebhookForContentUpdates: true, 
              contentSources: [ Contentful ]
              modelExtensions: [{ name: 'Untitled', type: 'Invoice', urlPath: '/{slug}' }],
    ],
            
        }),
})
import { defineStackbitConfig } from "@stackbit/types";
import { ContentfulContentSource } from "@stackbit/cms-contentful";
});
