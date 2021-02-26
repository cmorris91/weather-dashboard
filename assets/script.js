

var inputEl = $(".city-input");
var currentWeatherEl = $("#current-weather");
var forecastEl = $("#forecast");
var recentCity = $("#recent-city");

$("#button-addon2").on('click', function() {
    var cityInput = inputEl.val();
    var baseUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + cityInput + "&appid=e5b1844529612dd15add6a3867ed6a86&units=imperial";
    
    fetch(baseUrl)
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        console.log(data);
        var cityName = $('<h1>');    
        var temp = $('<p>');   
        var humidity = $('<p>');
        var wind = $('<p>')
        var icon = data.weather[0].icon
       
        cityName.text(data.name);
        temp.text("Temp: " + data.main.temp + " ° F ");
        humidity.text("Humidity: " + data.main.humidity + " %");
        wind.text("Wind: " + data.wind.speed + " MPH");

        currentWeatherEl.append(cityName);
        currentWeatherEl.append(temp);
        currentWeatherEl.append(humidity);
        currentWeatherEl.append(wind);
        
    })
    .catch(function(err) {
        console.error(err);
})

})
