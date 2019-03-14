const request = require ("request");

function geoCode (country, callbackFunc){
    var geoUrl = "https://api.mapbox.com/geocoding/v5/mapbox.places/"+ country + ".json?access_token=pk.eyJ1IjoiYWRoYW0tc3V3YW4iLCJhIjoiY2p0NGJpbWJ1MDF1MzQzbnllZndvejJidCJ9.yRMrV4tnsQtw6txo1Cl4Bw";
    request({url: geoUrl, json: true}, function (error, response){
        if (error){
            callbackFunc ("Unable to connect to the geo service!", undefined); //as there is no data, so it is undefined
        }
        else {
            var details = response.body.features;
            if (details.length > 0){
                var latitudeValue = details[0].center[1];
                var longitudeValue = details[0].center[0];
                var locationValue = details[0].place_name
                callbackFunc (undefined, //as there is no error, so it is undefined
                    { //data as json
                    latitude: latitudeValue,
                    longitude: longitudeValue,
                    location: locationValue
                    });
            }
            else {
                callbackFunc ("Unable to find entered country!", undefined); //as there is no data, so it is undefined
            }
        }
    });
}

exports.geocodeFunc = geoCode;