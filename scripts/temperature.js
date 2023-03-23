$(document).ready(function() {
	var apiKey = '7d6d38173ae18bf5a612fcdf14342cd4';
	var apiUrl = 'https://api.openweathermap.org/data/2.5/weather?q=Burnaby&appid=' + apiKey;
		
	$.getJSON(apiUrl, function(data) {
		var temperature = Math.round(data.main.temp - 273.15);
		var description = data.weather[0].description;
			
		$('#temperature').html(temperature + '°C');
		$('#description').html(description);
	});
});