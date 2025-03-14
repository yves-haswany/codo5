import React from 'react';

const App = ({ content }) => {
    if (!content) {
        return <div>Loading...</div>;
    }

    const { title, description, featuredImage, sections, footer } = content.fields;

    return (
        <div style={{ backgroundImage: `url(https://app.contentful.com/spaces/747xs9w91eto/assets/32wKwKnm7LIkCAQwRvpMqI?focusedField=file)` }}>
            <h1>Home</h1>
            <p>This website is to handle billing procedures for charging electric vehicles in domicile stations.
</p>
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
