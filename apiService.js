// apiService.js
export const fetchApiData = async () => {
  try {
    const response = await fetch('https://api.develop.rve.ca/v1/modules/c667ff46-9730-425e-ad48-1e950691b3f9/measuring-points/71ef9476-3855-4a3f-8fc5-333cfbf9e898/reads?start=2024-10-16&end=2024-11-25&limit=50&offset=0'', {
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
