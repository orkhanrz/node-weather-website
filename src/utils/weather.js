const request = require("request");

const weather = (lat, lon, callback) => {
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=5c5c01b12c58d89e561693b8f8f0f15b`;

  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback("No connection to the Weather API.", undefined);
    } else if (body.cod == 400) {
      callback(body.message, undefined);
    } else {
      callback(
        undefined,
        `${body.weather[0].main}. It is currently ${body.main.temp} degrees out. 
        It feels like ${body.main.feels_like} degrees out.
        Humidity is ${body.main.humidity}% and wind speed is ${body.wind.speed}km/h.`
      );
    }
  });
};

module.exports = weather;
