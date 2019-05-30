const locationForm = document.querySelector('form')
const search = document.querySelector('#location')

const locationText = document.querySelector('#locationText')
const forecastText = document.querySelector('#forecastText')

locationForm.addEventListener('submit', (e) => {
    e.preventDefault()
    let location = search.value

    if(location.trim() !== '') {
        forecastText.textContent = 'Loading...'
        locationText.textContent = ''

        fetch(`http://localhost:3030/weather?address=${location}`).then(res => {
            res.json().then(data => {
                if(data.error) {
                    forecastText.textContent = ''
                    return locationText.textContent = data.error
                }

                locationText.textContent = data.location
                forecastText.textContent = data.forecast
            })
        })
    } else {
        console.log('You need to provide a location!')
    }
})