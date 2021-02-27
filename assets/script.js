

var inputEl = $(".city-input");
var currentWeatherEl = $("#current-weather");
var forecastEl = $("#forecast");
var recentCity = $("#recent-city");
var cityEl = $('#cityname');
var dateEl = $('#currentdate');
var standInMsg = $('#standby-msg');


function getCurrentWeather() { 
    standInMsg.remove();
    var cityInput = inputEl.val();
    var date = moment().format("DD/MM/YYYY")

    fetch("http://www.mapquestapi.com/geocoding/v1/address?key=JgWvLdgBrNVGSTkR4kIyGDAmLg2LVUkK&location=" + cityInput)
    .then(function(response) {
        return response.json()
 })
 .then(function(data) {
     var lat = data.results[0].locations[0].latLng.lat.toString();
     var lng = data.results[0].locations[0].latLng.lng.toString();

     fetch("https://api.openweathermap.org/data/2.5/onecall?lat="+ lat + "&lon="+ lng + "&exclude=minutely,hourly&appid=e5b1844529612dd15add6a3867ed6a86&units=imperial") 
     .then(function (response) {
         return response.json();
    })
    .then(function (data) {
        console.log(data)
        
        var cityName = $('<h1>');    
        var temp = $('<p>');   
        var humidity = $('<p>');
        var wind = $('<p>');
        var icon = data.current.weather[0].icon
        var uv = $('<span>').attr("background-color", "gray");
        
        var iconUrl = " http://openweathermap.org/img/wn/" + icon + "@2x.png";
        
        $('.icon').attr('src', iconUrl).css('background-color', 'rgb(22 79 163 / 61%)');
        cityName.text(cityInput.toUpperCase());
        temp.text("Temp: " + data.current.temp + " ° F ");
        humidity.text("Humidity: " + data.current.humidity + " %");
        uv.text("UV Index: " + data.current.uvi);
        
       
    
        wind.text("Wind: " + data.current.wind_speed + " MPH");
        console.log(data.current.wind_speed);
        
        dateEl.append(date);
        cityEl.append(cityName);
        currentWeatherEl.append(temp);
        currentWeatherEl.append(humidity);
        currentWeatherEl.append(wind);
       
        if(data.current.uvi <= 3) {
            uv.css("background-color", "yellow");
        }
        else if (data.current.uvi >= 6) {
            uv.css("background-color", "red");
        }
        else {
            uv.css("background-color", "orange");
        }

        currentWeatherEl.append(uv);
    })
   
        })

        .catch(function(err) {
            console.error(err);
                
})

}


$("#button-addon2").on('click',getCurrentWeather)
    
// 