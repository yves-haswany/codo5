import React, { useState, useEffect } from 'react';
import { fetchApiData } from './apiService';

const ApiDataComponent = () => {
  const [apiData, setApiData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchApiData();
      setApiData(data);
      setLoading(false);
    };
    fetchData();
  }, []); // Empty dependency array means this runs once when the component mounts.

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Data from API</h1>
      <pre>{JSON.stringify(apiData, null, 2)}</pre>
    </div>
  );
};

export default ApiDataComponent;
