const request = require('request')

const geocode = (location, callback) => {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(location)}.json?access_token=pk.eyJ1Ijoia3JsZSIsImEiOiJjanc2Y2gwdDIxOWFpM3psOXVha2t1a3F6In0.8vPZEa5xKOXN57Gckvoe3g&limit=1`

    request({ url, json: true}, (error, { body }) => {
        if(error) {
            callback('Unable to connect to geolocation service.', undefined)
        } else if (!body.features.length) {
            callback('No such location.', undefined)
        } else {

            const {center, place_name: place} = body.features[0]

            const latitude  = center[1]
            const longitude = center[0]

            callback(undefined, {
                latitude,
                longitude,
                place
            })
        }
    })
}

module.exports = geocode