// apiService.js
export const fetchApiData = async () => {
  const response = await fetch('https://api.develop.rve.ca/docs#/', {
    method: 'GET',  // or POST if needed
    headers: {
      'Authorization': process.env.API_KEY, // If required
    },
  });

  const data = await response.json();
  return data;
};
