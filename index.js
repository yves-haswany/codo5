import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

// Function to fetch content from Contentful
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

    useEffect(() => {
        const entryId = '4SElkz101oeeuUyTB7Djy2'; // The entry ID you want to load
        fetchContentfulEntry(entryId).then(data => setContent(data));
    }, []);

    return (
        <React.StrictMode>
            <App content={content} />
        </React.StrictMode>
    );
};

ReactDOM.render(
    <Root />,
    document.getElementById('root')
);
