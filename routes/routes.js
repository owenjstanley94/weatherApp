const {Router} = require('express');
const router = Router();

const getWeather = require('../lib/getWeather');

router.get('/', (req, res) => {
    res.render('index');
})

router.post("/", async(req, res)=> {
    let city = req.body.city;
    let country = req.body.country;
    let data = await getWeather(city, country);

    if(data.cod !== "404") {
        let city = data.name;
        let country = data.sys.country;
        let temp = data.main.temp;
        let description = data.weather[0].description;
        let wind = data.wind.speed;
        res.render('index', {data:{city, country, description, temp, wind}});

    }  else {
        let message = `${city} does not exist`;
        res.render('index', {message});
    }
});

module.exports = router;