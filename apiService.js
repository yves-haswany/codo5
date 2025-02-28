// apiService.js
const startDate = '2024-10-16';
const endDate = '2024-11-25';
const limit = 50;
const offset = 0;
export const fetchApiData = async (startDate, endDate, limit, offset) => {
  try {
    const url = new URL('https://api.develop.rve.ca/v1/modules/c667ff46-9730-425e-ad48-1e950691b3f9/measuring-points/71ef9476-3855-4a3f-8fc5-333cfbf9e898/reads');
    url.searchParams.append('start', startDate);
    url.searchParams.append('end', endDate);
    url.searchParams.append('limit', limit);
    url.searchParams.append('offset', offset);

    const response = await fetch(url.toString(), {
      method: 'GET',  // or POST if needed
      headers: {
        'Authorization': `Bearer ${process.env.API_KEY}`, // If required
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
