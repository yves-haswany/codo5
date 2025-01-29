import React, { useState, useEffect } from 'react';
import { fetchApiData } from './apiService';
import { createClient } from 'contentful';

// Contentful setup
const contentfulClient = createClient({
  space: process.env.CONTENTFUL_SPACE_ID,
  accessToken: process.env.CONTENTFUL_MANAGEMENT_TOKEN,
});

const ApiAndContentfulComponent = () => {
  const [apiData, setApiData] = useState(null);
  const [contentfulData, setContentfulData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      // Fetch API data
      const apiResponse = await fetchApiData();
      setApiData(apiResponse);

      // Fetch Contentful data (example: fetching all blog posts)
      const contentfulResponse = await contentfulClient.getEntries({ content_type: 'blogPost' });
      setContentfulData(contentfulResponse.items);

      setLoading(false);
    };
    fetchData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>API Data</h1>
      <pre>{JSON.stringify(apiData, null, 2)}</pre>

      <h2>Contentful Blog Posts</h2>
      {contentfulData.map((item) => (
        <div key={item.sys.id}>
          <h3>{item.fields.title}</h3>
          <p>{item.fields.body}</p>
        </div>
      ))}
    </div>
  );
};

export default ApiAndContentfulComponent;
