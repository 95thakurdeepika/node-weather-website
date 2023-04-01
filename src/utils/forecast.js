const request = require('request');

const forecast = (lat, lon, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=48620a3f4b740a1f725c1cedde20f5f5&query='+ lon +','+ lat +'&units=f';

    request({url, json:true}, (error, {body} = {}) => {
        if(error){
             callback(`Internet Issues`, undefined);
        } else if(body.error){
             callback(`Unable to find Location`,undefined);
        } else{ 
            callback(undefined,`${body.current.weather_descriptions[0]}. It is currently ${body.current.temperature} degrees out. There is a ${body.current.precip}% chance of rain.`)
        }
        })
    }

module.exports = forecast