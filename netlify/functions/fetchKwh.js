const fetch = require('node-fetch');

exports.handler = async (event) => {
  const moduleUuid = "c667ff46-9730-425e-ad48-1e950691b3f9";
  const measuringPointUuid = "71ef9476-3855-4a3f-8fc5-333cfbf9e898";
  const start = "2024-10-16";
  const end = "2024-11-25";

  const url = https://api.develop.rve.ca/v1/modules/${moduleUuid}/measuring-points/${measuringPointUuid}/reads?start=${start}&end=${end};

  try {
    const response = await fetch(url, {
      headers: { "Access-Token": process.env.API_Key },
    });
    const data = await response.json();

    // Process and return the data
    return {
      statusCode: 200,
      body: JSON.stringify(data),
    };
  } catch (error) {
    return { statusCode: 500, body: JSON.stringify({ error: error.message }) };
  }
};
