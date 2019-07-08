const request = require('request');

geoCode = (address, callback) => {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=pk.eyJ1IjoiYWJiYXNpdCIsImEiOiJjanhmeW5iejgwZzRxM29tazRmZGxiY3gzIn0.K4rgLZh86gthVVXZy6O3vw&li&limit=1`;
    request({ url, json: true }, (error, { body }) => {
        if (error)
            return callback('Unable to connect location service.');

        if (body.features.length === 0)
            return callback('Location not found!');

        const { center: [longitude, latitude], place_name: place } = body.features[0];
        callback(undefined, { longitude, latitude, place });

    });
}

forecast = (longitude, latitude, callback) => {
    const url = `https://api.darksky.net/forecast/5f61acfc72654e5a12f8fddbeae45c8a/${longitude},${latitude}`;
    request({ url, json: true }, (error, { body }) => {
        if (error)
            return callback('Unable to connect weather service');
        if (body.error)
            return callback('Location not found. Please search with different address');

        const { temperature: temp, precipProbability: rainChances } = body.currently;
        const { summary: weatherSummary } = body.daily.data[0];
        const weatherForecast = `it is currently ${temp} degrees out.There is a ${rainChances} % chances of rain.`
        callback(undefined, { weatherSummary, weatherForecast });
    });
}

module.exports = { geoCode, forecast }