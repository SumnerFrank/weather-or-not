// Universal Variables
const apiKey = "fdb3fbd4a502e98a93742bb761dbcb16";
const apiURL = `https://api.openweathermap.org/data/2.5/uvi?appid=${apiKey}&lat=${lat}&lon=${lon}`;
const cities = [];
const searchBtn = document.querySelector('#searchBtn');
const searchHistoryBtn = document.querySelector('#searchHistoryBtn');



// Necessary Functions
function getCity(city) {
  fetch(apiURL)
  .then(function(response) {
    response.json().then(function(data) {
      displayForecast(data)
    })
  })
}

function getCityWeather(city) {
  fetch(apiURL)
  .then(function(response) {
    response.json().then(function(data) {
      displayForecast(data, city)
    })
  })
}

// function displayForecast(weather) {

// }

// function searchHistory(searchHistory) {

// }

// HANDLERS
searchBtn.addEventListener("submit", formSubmitHandler);
searchHistoryBtn.addEventListener("submit", searchHistoryHandler);