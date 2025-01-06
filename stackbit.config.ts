import { defineStackbitConfig } from '@stackbit/types';
import { ContentfulContentSource } from '@stackbit/cms-contentful';

export default defineStackbitConfig({
    stackbitVersion: "0.3.127",
    nodeVersion: "20.18.0",
    ssgName: "nextjs",
    contentSources: [
        new ContentfulContentSource({
            name: 'contentful',
            type: '@stackbit/cms-contentful',
            spaceId: process.env.CONTENTFUL_SPACE_ID!,
            environment: process.env.CONTENTFUL_ENVIRONMENT! || 'master',
            previewToken: process.env.CONTENTFUL_PREVIEW_TOKEN!,
            accessToken: process.env.CONTENTFUL_ACCESS_TOKEN!,
            managementToken: process.env.CONTENTFUL_MANAGEMENT_TOKEN!,
            useWebhookForContentUpdates: true
        }) // Corrected: Closing the configuration object properly
    ],
    modelExtensions: [
        {
            name: "Untitled",
            type: "Invoice",
            urlPath: "https://app.contentful.com/spaces/j86lyi7eedea/visual_modeler/content_types/invoice"
        }
    ],
    postInstallCommand: "npm i --no-save @stackbit/types @stackbit/cms-contentful"
});
