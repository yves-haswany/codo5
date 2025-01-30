export const fetchApiData = async () => {
  try {
    const response = await fetch('https://api.develop.rve.ca/docs#/', {
      method: 'GET',  // or POST if needed
      headers: {
        'Authorization': process.env.API_KEY, // If required
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    console.log('API data fetched successfully:', data); // Logging fetched data
    return data;
  } catch (error) {
    console.error('Failed to fetch API data:', error); // Logging errors
    return null;
  }
};
