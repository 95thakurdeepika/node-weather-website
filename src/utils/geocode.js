const request = require('request');

const geocode =(address,callback) =>{
    const url = 'https://api.openweathermap.org/data/2.5/weather?q=' + address + '&appid=635b575e27d3ab9f84f52ca189660fba';

    request({url,json:true}, (error, {body}) => {
        console.log(body)
        if(error){
             callback(`Internet Issues`, undefined);
        } else if(body.cod == 404){
             callback(`Unable to find Location`, undefined);
        } else{ 
            callback(undefined,{
                lon: body.coord.lon,
                lat: body.coord.lat,
                loc: body.name
            })
        }
        })
    }

module.exports = geocode