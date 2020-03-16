const hbs = require('express-handlebars');
const path = require('path');
const bodyParser = require('body-parser');
const express = require('express');

const app = express();
require('dotenv').config();

const getWeather = require('./lib/getWeather')

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.engine('.hbs', hbs({
    defaultLayout: 'Layout',
    extname: '.hbs'
}));
app.set('view engine', '.hbs');

app.get('/', (req, res) => {
    res.render('index');
})

app.post("/", async(req, res)=> {
    let city = req.body.city;
    console.log(city)

    let data = await getWeather();

    let temp = data.main.temp;
    let description = data.weather[0].description;
    let wind = data.wind.speed;

    res.render('index', {data:{description, temp, wind}});
    
})
app.listen(3000, () => {
    console.log('server listening on port 3000');
});

module.exports.city = {city};