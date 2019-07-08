
const address = document.querySelector('#address');
const loc = document.querySelector('#location');
const forecast = document.querySelector('#forecast');

document.querySelector('#locationForm').addEventListener('submit', (e) => {
    e.preventDefault();
    loc.textContent = 'Loading...';
    forecast.textContent = '';
    fetch('http://localhost:3000/weather?address=' + address.value).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                loc.textContent = data.error;
            }
            else {
                loc.textContent = data.location;
                forecast.textContent = data.summary + data.forecast;
            }
        }
        )
    });
});




