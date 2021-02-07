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

    if(data !== null) {
        let city = data.name;
        let country = data.sys.country;
        let temp = `${Math.round(data.main.temp)} + ${'&#8451;'}`;
        let description = data.weather[0].description;

        res.render('index', {data: {city, country, description, temp}});

    }  else {
        let message = `${city} does not exist`;
        res.render('index', {message});
    }
});

module.exports = router;