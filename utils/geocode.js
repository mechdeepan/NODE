const request = require("request");

const geocode = (address, callback) => {
    const url =
      "https://api.mapbox.com/geocoding/v5/mapbox.places/" +
      encodeURIComponent(address) +
      ".json?access_token=pk.eyJ1IjoiamFnYWRlc2gwNyIsImEiOiJjbTB1dHkwZ3EwYjF5MmxzZTE5eDFveHN4In0.W9A7svv6ozS8Mlxr18l40w&limit=1";
  
    request({ url: url, json: true }, (error, response) => {
      if (error) {
        callback("Unable to connect the location service!", undefined);
      } else if (response.body.features.lenght === 0) {
        callback("Unable to find the location.Try another search !", undefined);
      } else {
          callback(undefined,{
              latitude : response.body.features[0].center[0],
              longitude : response.body.features[0].center[1],
              location : response.body.features[0].place_name
          })
      }
    });
  };

  module.exports = geocode;
  
 