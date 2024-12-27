import { defineStackbitConfig } from '@stackbit/types';
import { ContentfulContentSource } from '@stackbit/cms-contentful';

export default defineStackbitConfig({
    stackbitVersion: "~0.6.0",
    nodeVersion: "18",
    ssgName: "nextjs",
    contentSources: [
        new ContentfulContentSource({
            spaceId: process.env.CONTENTFUL_SPACE_ID!,
            environment: process.env.CONTENTFUL_ENVIRONMENT! || 'master',
            previewToken: process.env.CONTENTFUL_PREVIEW_TOKEN!,
            accessToken: process.env.CONTENTFUL_MANAGEMENT_TOKEN!,
            useWebhookForContentUpdates: true,
        }),
    ],
    modelExtensions: [
        {
            name: "Untitled",
            type: "Invoice",
            urlPath: "/{slug}",
        },
    ],
    postInstallCommand: "npm i --no-save @stackbit/types @stackbit/cms-contentful",
});

