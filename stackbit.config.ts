

import { defineStackbitConfig,SiteMapEntry } from '@stackbit/types';
import { ContentfulContentSource } from '@stackbit/cms-contentful';
import dotenv from 'dotenv';

dotenv.config();
export default defineStackbitConfig({
    stackbitVersion: "~0.6.0",
    nodeVersion: "20.18.1",
    ssgName: "nextjs",
    contentSources: [
        new ContentfulContentSource({
            spaceId: process.env.CONTENTFUL_SPACE_ID!,
            environment: process.env.CONTENTFUL_ENVIRONMENT! || 'master',
            previewToken: process.env.CONTENTFUL_PREVIEW_TOKEN!,
            accessToken: process.env.CONTENTFUL_MANAGEMENT_TOKEN!
        })
    ],
    modelExtensions: [
        {
            name: "homePage",
            type: "page",
            urlPath: "/home/{slug}",
        }
    ],
  siteMap: ({ documents, models }) => {
        const pageModels = models.filter(m => m.type === "page");
        return documents
            .filter(d => pageModels.some(m => m.name === d.modelName))
            .map(document => {
                const urlModel = (() => {
                    switch (document.modelName) {
                        case 'homePage':
                            return 'home';
                        case 'otherPage':
                            return 'otherPage';
                        default:
                            return null;
                    }
                });
                if (!urlModel) return null;
                return {
                    stableId: document.id,
                    urlPath: `/${urlModel}/${document.fields.slug}`,
                    document,
                    isHomePage: document.modelName === 'homePage',
                };
            })
            .filter(Boolean) as SiteMapEntry[];
    },
   
    postInstallCommand: "npm i --no-save @stackbit/types @stackbit/cms-contentful"
});