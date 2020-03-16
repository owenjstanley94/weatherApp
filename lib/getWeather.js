const fetch = require('node-fetch');
let city = require('city');


const getWeather = async () => {
    let data = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city},uk&units=metric&appid=${process.env.APPID}`);

    return await data.json();
}

module.exports = getWeather;