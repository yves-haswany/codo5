import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

const fetchContentfulEntry = async (entryId) => {
    const response = await fetch(`https://cdn.contentful.com/spaces/${process.env.CONTENTFUL_SPACE_ID}/environments/${process.env.CONTENTFUL_ENVIRONMENT}/entries/${entryId}`, {
        headers: {
            Authorization: `Bearer ${process.env.CONTENTFUL_MANAGEMENT_TOKEN}`
        }
    });
    return response.json();
};

const Root = () => {
    const [content, setContent] = useState(null);
    const [selectedEntry, setSelectedEntry] = useState(null); // State to track selected entry

    useEffect(() => {
        if (selectedEntry) {
            fetchContentfulEntry(selectedEntry).then(data => setContent(data));
        }
    }, [selectedEntry]);

    const handleSitemapClick = (entryId) => {
        setSelectedEntry(entryId);
    };

    return (
        <React.StrictMode>
            <App content={content} onSitemapClick={handleSitemapClick} />
        </React.StrictMode>
    );
};

ReactDOM.render(
    <Root />,
    document.getElementById('root')
);
