const request = require('request')

const forecast = (lat, long, callback) => {
    const url = `https://api.darksky.net/forecast/57a1b7ed653c4112c61b2851dc3f32de/${lat},${long}?lang=sr&units=si`

    request({
        url,
        json: true
    },(error, { body }) => {
        if(error) {
            callback('Unable to connect to weather service.', undefined)
        } else if(body.error) {
            callback('Unable to find location.', undefined)
        } else {
            const { currently, daily } = body
            callback(undefined, `${daily.data[0].summary} Trenutno je napolju ${currently.temperature} stepeni. Postoji ${Math.round(currently.precipProbability)}% za padavine.`)
        }
    })
}

module.exports = forecast