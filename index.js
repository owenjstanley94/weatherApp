const hbs = require('express-handlebars');
const path = require('path');
const bodyParser = require('body-parser');
const express = require('express');

const app = express();

require('dotenv').config();

const router = require('./routes/routes');

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use('/', router);

app.engine('.hbs', hbs({
    defaultLayout: 'Layout',
    extname: '.hbs'
}));

app.set('view engine', '.hbs');

app.use((req, res) => {
    res.status(404).render('404')
});

app.listen(3000, () => {
    console.log('server listening on port 3000');
});

