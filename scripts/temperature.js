// Set up API request URL with your API key and location
const apiKey = '7d6d38173ae18bf5a612fcdf14342cd4';
const city = 'Burnaby';
const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;

$(document).ready(function() {
	// var apiKey = '7d6d38173ae18bf5a612fcdf14342cd4';
	// var apiUrl = 'https://api.openweathermap.org/data/2.5/weather?q=Burnaby&appid=' + apiKey;
		
	$.getJSON(apiUrl, function(data) {
		var temperature = Math.round(data.main.temp - 273.15);
		var description = data.weather[0].description;
			
		$('#temperature').html(temperature + '°C');
		$('#description').html(description);
	});
});

fetch(apiUrl)
  .then(response => response.json())
  .then(data => {
    const iconCode = data.weather[0].icon;
    const iconUrl = `https://openweathermap.org/img/w/${iconCode}.png`;
    const iconImg = document.createElement('img');
    iconImg.src = iconUrl;
    document.getElementById('weather-icon').appendChild(iconImg);
  })
  .catch(error => console.log(error));