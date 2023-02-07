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

  // catch 5 days weather and dispaly
  var forecastQueryURL =
    "https://api.openweathermap.org/data/2.5/forecast?q=" +
    city +
    "&appid=" +
    APIKey;
  $.ajax({
    url: forecastQueryURL,
    method: "GET",
  }).then(function (response) {
    var forecastEls = document.querySelectorAll(".forecast");
    //console.log(forecastEls);
    for (i = 0; i < forecastEls.length; i++) {
      forecastEls[i].innerHTML = " ";
      var forecastIndex = i * 8 + 3;
      var forecastDate = new Date(response.list[forecastIndex].dt_txt);
      //console.log(forecastDate);
      var forecastDay = forecastDate.getDate();
      var forecastMonth = forecastDate.getMonth() + 1;
      var forecastYear = forecastDate.getFullYear();
      var forecastDateEl = document.createElement("p");
      forecastDateEl.innerHTML =
        forecastMonth + "/" + forecastDay + "/" + forecastYear;
      forecastEls[i].append(forecastDateEl);

      var forecastWeatherEl = document.createElement("img");
      forecastWeatherEl.setAttribute("class","forecastimg");
      forecastWeatherEl.setAttribute("src", "https://openweathermap.org/img/wn/" + response.list[forecastIndex].weather[0].icon + "@2x.png");
      forecastWeatherEl.setAttribute("alt", response.list[forecastIndex].weather[0].description);
      forecastEls[i].append(forecastWeatherEl);
      var forecastTempEl = document.createElement("p");
      var celsius = response.list[forecastIndex].main.temp - 273.15;
      forecastTempEl.innerHTML = "Temp: " + celsius.toFixed(1) + " °C";
      forecastEls[i].append(forecastTempEl);
      var forecastwindEl = document.createElement("p");
      forecastwindEl.innerHTML = "Wind Speed:  " + response.list[forecastIndex].wind.speed + "MPH";
      forecastEls[i].append(forecastwindEl);
      var forecastHumidityEl = document.createElement("p");
      forecastHumidityEl.innerHTML = "Humidity: " + response.list[forecastIndex].main.humidity + "%";
      forecastEls[i].append(forecastHumidityEl);

    }
  });
}

// add search event
searchEl.addEventListener("click", function (event) {
  event.preventDefault();
  var searchCity = inputEl.value;
  //console.log(searchCity);
  getWeather(searchCity);
  searchHistory.push(searchCity);
  localStorage.setItem("search", JSON.stringify(searchHistory));
  renderhistoryButtons();
});

function renderhistoryButtons() {
  $("#history").empty();
  for (var i = 0; i < searchHistory.length; i++) {
    var historyItem = $("<button>");
    historyItem.addClass("form-button");
    historyItem.attr("data-name", searchHistory[i]);
    historyItem.text(searchHistory[i]);
    //historyItem = Array.from(new Set(searchHistory));
    $("#history").append(historyItem);
  }
}

$(document).on("click", ".form-button", function () {
  var historyItem = $(this).attr("data-name");
  //console.log("dsf"+historyItem);
  getWeather(historyItem);
});

function unique(arr) {
  for (var i = 0; i < arr.length; i++) {
    for (var j = i + 1; j < arr.length; j++) {
      if (arr[i] == arr[j]) {
        arr.splice(j, 1);
        j--;
      }
    }
  }
  return arr;
}
renderhistoryButtons();
