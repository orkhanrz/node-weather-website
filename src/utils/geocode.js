const request = require("request");

const geocode = (address, callback) => {
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
    address
  )}.json?access_token=pk.eyJ1Ijoib3JraGFucno4IiwiYSI6ImNrd3M0Y3NoNjEybHgydnAzbGtidGd6bTEifQ.WM6Ty85Bw8C0_VKVwjZ0jQ&limit=1`;

  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback("You have no connection to the weather API.", undefined);
    } else if (body.features.length === 0) {
      callback("No location found.", undefined);
    } else {
      callback(undefined, {
        lat: body.features[0].center[1],
        lon: body.features[0].center[0],
        location: `${body.features[0].place_name}.`,
      });
    }
  });
};

module.exports = geocode;
