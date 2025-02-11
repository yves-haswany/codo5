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
            accessToken: process.env.CONTENTFUL_MANAGEMENT_TOKEN!,
            useWebhookForContentUpdates: true
        })
    ],
    modelExtensions: [
        {
            name: "homePage",
            type: "page",
            urlPath: "/{slug}",
            fields: [
                {
                    id: 'description',
                    name: 'Description',
                    type: 'RichText',
                    validations: [
                        {
                            enabledNodeTypes: [
                                "heading-1",
                                "heading-2",
                                "heading-3",
                                "heading-4",
                                "heading-5",
                                "heading-6",
                                "ordered-list",
                                "unordered-list",
                                "hr",
                                "blockquote",
                                "embedded-entry-block",
                                "embedded-asset-block",
                                "hyperlink",
                                "entry-hyperlink",
                                "asset-hyperlink",
                                "embedded-entry-inline"
                            ],
                            message: "Only specific node types are allowed"
                        },
                        {
                            enabledMarks: [
                                "bold",
                                "italic",
                                "underline",
                                "code"
                            ],
                            message: "Only specific marks are allowed"
                        }
                    ]
                }
            ]
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
                            return 'homePage';
                        case 'otherPage':
                            return 'page';
                        default:
                            return null;
                    }
                });
                if (!urlModel) return null;
                return {
                    stableId: document.id,
                    urlPath: `/${urlModel}/${document.id}`,
                    document,
                    isHomePage: document.modelName === 'homePage',
                };
            })
            .filter(Boolean) as SiteMapEntry[];
    },
    assetsConfig: {
        uploadDir: "assets/uploads",
        publicPath: "/uploads",
        supportedExtensions: [".jpg", ".jpeg", ".png", ".gif", ".svg"]
    },
    postInstallCommand: "npm i --no-save @stackbit/types @stackbit/cms-contentful"
});
