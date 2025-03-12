import Link from 'next/link';
import { Card } from 'components/card';
import { RandomQuote } from 'components/random-quote';
import { Markdown } from 'components/markdown';
import { ContextAlert } from 'components/context-alert';
import { getNetlifyContext } from 'utils';

// Add the ComposablePage component import
import { ComposablePage } from 'components/ComposablePage'; // Adjust the import path accordingly

const cards = [
    //{ text: 'Hello', linkText: 'someLink', href: '/' }
];

const contextExplainer = `
The card below is rendered on the server based on the value of \`process.env.CONTEXT\` 
([docs](https://docs.netlify.com/configure-builds/environment-variables/#build-metadata)):
`;

const preDynamicContentExplainer = `
The card content below is fetched by the client-side from \`/quotes/random\` (see file \`app/quotes/random/route.js\`) with a different quote shown on each page load:
`;

const postDynamicContentExplainer = `
On Netlify, Next.js Route Handlers are automatically deployed as [Serverless Functions](https://docs.netlify.com/functions/overview/).
Alternatively, you can add Serverless Functions to any site regardless of framework, with access to the [full context data](https://docs.netlify.com/functions/api/).

And as always with dynamic content, beware of layout shifts & flicker! (here, we aren't...)
`;

const ctx = getNetlifyContext();

export default function Page() {
    return (
        <main className="flex flex-col gap-8 sm:gap-16">
            <section className="flex flex-col items-start gap-3 sm:gap-4">
                <ContextAlert />
                <h1 className="mb-0">Codo-Invoicing and billing for electric vehicle recharging</h1>
                <p className="text-lg">Your friendly online billing service</p>
                <Link
                    href="https://app.contentful.com/spaces/747xs9w91eto/entries/4SElkz101oeeuUyTB7Djy2?focusedField=title"
                    className="btn btn-lg btn-primary sm:btn-wide"
                >
                    Go to the home page
                </Link>
                <Link
                    href="https://example.com/about"
                    className="btn btn-lg btn-secondary sm:btn-wide"
                >
                    About Us
                </Link>
                <Link
                    href="https://example.com/contact"
                    className="btn btn-lg btn-secondary sm:btn-wide"
                >
                    Contact Us
                </Link>
            </section>
            {!!ctx && (
                <section className="flex flex-col gap-4">
                    <Markdown content={contextExplainer} />
                    <RuntimeContextCard />
                </section>
            )}
            <section className="flex flex-col gap-4">
                <Markdown content={preDynamicContentExplainer} />
                <RandomQuote />
                <Markdown content={postDynamicContentExplainer} />
            </section>
            {/* !!cards?.length && <CardsGrid cards={cards} /> */}
            {/* !!cards?.length && <CardsGrid cards={cards} /> */}
            {/* Add the ComposablePage component here */}
            <ComposablePage id="Home" title="Codo Home Page" />
        </main>
    );
}

function RuntimeContextCard() {
    const title = `Netlify Context: running in ${ctx} mode.`;
    if (ctx === 'dev') {
        return <Card title={title} text="Next.js will rebuild any page you navigate to, including static pages." />;
    } else {
        return <Card title={title} text="This page was statically-generated at build time." />;
    }
}
