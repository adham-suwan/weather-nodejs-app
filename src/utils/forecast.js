const request = require ("request");

function forecast (latitude, longitude, callbackFunc){
    var weatherUrl = "https://api.darksky.net/forecast/d43a54f66bc77a4fc36c39a2e93089f6/"+latitude+","+longitude+"?units=si";

    request({url: weatherUrl, json: true}, function (error, response) { 

        if (error){ 
            callbackFunc ("Unable to connect to the weather service!", undefined);
        }
        else if (response.body.error){
            callbackFunc ("Unable to find location!", undefined);
        }
        else{

        var degreesValue = response.body.currently.temperature;
        var rainProbValue = response.body.currently.precipProbability;
        var summaryValue = response.body.daily.data[0].summary;

        callbackFunc (undefined, {
            degrees: degreesValue,
            rainProb: rainProbValue,
            summary: summaryValue
        });
        }

    });
}


exports.forecastFunc = forecast;