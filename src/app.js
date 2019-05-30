const path = require('path')
const express = require('./node_modules/express')
const hbs = require('./node_modules/hbs')
const geocode = require('../utils/geocode')
const forecast = require('../utils/forecast')

// Define paths for express and handlebars
const pubPath = path.join(__dirname, '../public')
const viewPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Initialize express
const app = express()
const port = process.env.PORT || 3030

// Handlebars config
app.set('view engine', 'hbs')
app.set('views', viewPath)
hbs.registerPartials(partialsPath)

// Set static public path for express
app.use(express.static(pubPath))


//-------------------------
//      Routes
//-------------------------

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Milan'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        name: 'Milan'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help page',
        message: 'Here is the help message',
        name: 'Milan'
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: 'My 404 Page',
        error: 'Could not find help article.',
        name: 'Milan'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'Address must be provided'
        })
    }

    geocode(req.query.address, (error, { place, latitude, longitude } = {}) => {
        if (error) {
            return res.send({ error })
        }

        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({ error })
            }

            res.send({
                location: place,
                forecast: forecastData,
                address: req.query.address
            })
        })
    })
})

app.get('/products', (req, res) => {
    console.log(req.query)
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        })
    }
    res.send({
        products: []
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: 'My 404 Page',
        error: 'Could not find page.',
        name: 'Milan'
    })
})

app.listen(port , () => {
    console.log('Starting on port ' + port)
})