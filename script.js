var APIKey = "33759846bc0f4ad6eea2a8a5065678b2";
var inputEl = document.getElementById("search-input");
var searchEl = document.getElementById("search-button");
var currentPicture = document.getElementById("current-picture");
var searchHistory = JSON.parse(localStorage.getItem("search")) || [];

unique(searchHistory);
// catch current weather and dispaly
function getWeather(city) {
  //display current weather
  var queryURL =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    city +
    "&appid=" +
    APIKey;
  $.ajax({
    url: queryURL,
    method: "GET",
  }).then(function (response) {
    var currentDate = moment().format("L");
    //console.log(currentDate);
    $("#city-name").text(response.name + "  (" + currentDate + ")");
    var weatherPic = response.weather[0].icon;
    currentPicture.setAttribute(
      "src",
      "https://openweathermap.org/img/wn/" + weatherPic + "@2x.png"
    );
    currentPicture.setAttribute("alt", response.weather[0].description);
    var celsius = response.main.temp - 273.15;
    $("#temperature").text("Temperature: " + celsius.toFixed(1) + " °C");
    $("#wind-speed").text("Wind Speed: " + response.wind.speed + " MPH");
    $("#humidity").text("Humidity: " + response.main.humidity + "%");
  });

 
}

