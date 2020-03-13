const hbs = require('express-handlebars');
const path = require('path');
const express = require('express');

const app = express();
require('dotenv').config();

const getWeather = require('./lib/getWeather')

app.use(express.static(path.join(__dirname, 'public')));

app.engine('.hbs', hbs({
    defaultLayout: 'Layout',
    extname: '.hbs'
}));
app.set('view engine', '.hbs');

app.get('/', async (req, res) => {

    let data = await getWeather();

    console.log(data);

    res.render('index', {data: 'Hello from express'});
})

app.listen(3000, () => {
    console.log('server listening on port 3000');
});