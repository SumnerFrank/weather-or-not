// Universal Variables
const apiKey = 'fdb3fbd4a502e98a93742bb761dbcb16';
const apiURL = `https://api.openweathermap.org/data/2.5/uvi?appid=${apiKey}&lat=${lat}&lon=${lon}`;
const cities = [];
const searchBtn = document.querySelector('#city-search-form');
const cityInpulEl = document.querySelector('#city')
const searchHistoryBtn = document.querySelector('#past-search-btn');
const citySearchInputEl = document.querySelector('#searched-city')
const weatherContainerEl = document.querySelector('#current-weather-container');
const forecastTitleEl = document.querySelector('#forecast')
const forecastContainerEl = document.querySelector('#five-day-container');



// Necessary Functions
function formSubmitHandler(event){
  event.preventDefault()
  var city = cityInputEl.value.trim()
  if(city){
      getCityWeather(city)
      getCity(city)
      cities.unshift({city})
      cityInputEl.value = ""
  } else{
      alert("Please enter a City")
  }
  saveSearch()
  pastSearch(city)
}

function saveSearch(){
  localStorage.setItem('cities', JSON.stringify(cities))
}

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

function displayForecast(weather, searchCity) {
  weatherContainerEl.textContent = ''
  citySearchInputEl.textContent = searchCity

  //date 
  const currentDate = document.createElement('span')
  currentDate.textContent=" (" + moment(weather.dt.value).format("MMM D, YYYY") + ") "
  citySearchInputEl.appendChild(currentDate)

  //image
  var weatherIcon = document.createElement("img")
  weatherIcon.setAttribute("src", `https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`)
  citySearchInputEl.appendChild(weatherIcon)

  //temp 
  var temperatureEl = document.createElement("span")
  temperatureEl.textContent = "Temperature: " + weather.main.temp + " °F"
  temperatureEl.classList = "list-group-item"

  // wind
  var windSpeedEl = document.createElement("span")
  windSpeedEl.textContent = "Wind Speed: " + weather.wind.speed + " MPH"
  windSpeedEl.classList = "list-group-item"

  // humidity
  var humidityEl = document.createElement("span")
  humidityEl.textContent = "Humidity: " + weather.main.humidity + " %"
  humidityEl.classList = "list-group-item"

}

// function searchHistory(searchHistory) {

// }

// HANDLERS
searchBtn.addEventListener("submit", formSubmitHandler);
searchHistoryBtn.addEventListener("submit", searchHistoryHandler);