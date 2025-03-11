import React from 'react';

const App = ({ content }) => {
    if (!content) {
        return <div>Loading...</div>;
    }

    const { title, description, featuredImage, sections, footer } = content.fields;

    return (
        <div style={{ backgroundImage: `url(${featuredImage.fields.file.url})` }}>
            <h1>{title}</h1>
            <p>{description}</p>
            <div>
                {sections && sections.map((section, index) => (
                    <div key={index}>
                        <h2>{section.title}</h2>
                        <p>{section.content}</p>
                    </div>
                ))}
            </div>
            <footer>
                <p>{footer.content}</p>
            </footer>
        </div>
    );
};

export default App;
