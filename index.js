import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { BrowserRouter as Router, Route, useParams } from 'react-router-dom';

// Function to fetch content from Contentful
const fetchContentfulEntry = async (slug) => {
    const response = await fetch(`https://cdn.contentful.com/spaces/${process.env.CONTENTFUL_SPACE_ID}/environments/${process.env.CONTENTFUL_ENVIRONMENT}/entries?content_type=homePage&fields.slug=${slug}`, {
        headers: {
            Authorization: `Bearer ${process.env.CONTENTFUL_MANAGEMENT_TOKEN}`
        }
    });
    const data = await response.json();
    return data.items[0]; // Assuming the first item is the desired entry
};

const ContentPage = () => {
    const { slug } = useParams();
    const [content, setContent] = useState(null);

    useEffect(() => {
        fetchContentfulEntry(slug).then(data => setContent(data));
    }, [slug]);

    return <App content={content} />;
};

const Root = () => (
    <Router>
        <Route path="/:slug" component={ContentPage} />
    </Router>
);

ReactDOM.render(
    <Root />,
    document.getElementById('root')
);
