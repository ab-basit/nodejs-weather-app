const path = require('path');
const express = require('express');
const hbs = require('hbs');
const utils = require('./utils/utils');

const app = express();
app.listen(3000);

const templatePath = path.join(__dirname, '../templates/views');
const partialPath = path.join(__dirname, '../templates/partials');
const staticResourcesPath = path.join(__dirname, '../public');

app.set('view engine', 'hbs');
app.set('views', templatePath);
app.use(express.static(staticResourcesPath));

hbs.registerPartials(partialPath);

app.get('/', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Abdul Basit'
    });
});

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        name: 'Abdul Basit'
    });
});


app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Abdul Basit'
    });
});


app.get('/weather', (req, res) => {
    if (!req.query.address)
        return res.send({
            error: 'address is missing'
        });
    utils.geoCode(req.query.address, (error, { longitude, latitude, place } = {}) => {
        if (error)
            return res.send({ error });
        utils.forecast(longitude, latitude, (error, forecast) => {
            if (error)
                return res.send({ error });
            res.send({
                summary: forecast.weatherSummary,
                forecast: forecast.weatherForecast,
                location: place
            });
        });

    });
});

app.get('/help/*', (req, res) => {
    res.render('404', {
        errorMessage: 'Help article not found',
        name: 'Abdul Basit'
    });
});

app.get('*', (req, res) => {
    res.render('404', {
        errorMessage: 'Page Not found!',
        name: 'Abdul Basit'
    })
});
