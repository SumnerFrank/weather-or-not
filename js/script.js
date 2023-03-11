// Universal Variables
const cities = [];
const searchBtn = document.querySelector('#city-search-form');
const cityInputlEl = document.querySelector('#city')
const searchHistoryBtn = document.querySelector('#past-search-btn');
const citySearchInputEl = document.querySelector('#searched-city')
const weatherContainerEl = document.querySelector('#current-weather-container');
const forecastTitle = document.querySelector('#forecast')
const forecastContainerEl = document.querySelector('#five-day-container');



// Necessary Functions
function formSubmitHandler(event){
  console.log('hello world');
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
  searchHistory(city)
}

function saveSearch(){
  localStorage.setItem('cities', JSON.stringify(cities))
}

function getCity(city) {
const apiKey = 'fdb3fbd4a502e98a93742bb761dbcb16';
const apiURL = `https://api.openweathermap.org/data/forecast?q=${city}&units=imperial&appid=${apiKey}`
  fetch(apiURL)
  .then(function(response) {
    response.json().then(function(data) {
      displayForecast(data)
    })
  })
}

function getCityWeather(city) {
  const apiKey = 'fdb3fbd4a502e98a93742bb761dbcb16';
  const apiURL = `https://api.openweathermap.org/data/forecast?q=${city}&units=imperial&appid=${apiKey}`
  fetch(apiURL)
  .then(function(response) {
    response.json().then(function(data) {
      displayWeather(data, city)
    })
  })
}

function displayWeather(weather, searchCity) {
  // resets to empty form 
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

  // adds elements to container 
  weatherContainerEl.appendChild(temperatureEl)
  weatherContainerEl.appendChild(humidityEl)
  weatherContainerEl.appendChild(windSpeedEl)

let lat = weather.coord.lat;
let lon = weather.coord.lon;
getIndex(lat, lon)

}

function displayForecast(weather) {
  // resets to empty form 
  forecastContainerEl.textContent = ''
  forecastTitle.textContent = '5 Day Forecast:'

  let forecast = weather.list 
    for(var i=5; i < forecast.length; i=i+8) {
      let dailyForecast = forecast[i]

      const forecastEl = document.createElement('div')
      forecastEl.classList = "card bg-primary text-light m-2"
      
  //date 
  const forecastDate = document.createElement('h4')
  forecastDate.textContent=" (" + moment(dailyForecast.dt.value).format("MMM D, YYYY") + ") "
  forecastDate.classList = 'card-header text-center'
  forecastEl.appendChild(forecastDate)

  //image
  var weatherIcon = document.createElement("img")
  weatherIcon.classList = 'card-body text-center'
  weatherIcon.setAttribute("src", `https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`)
  forecastEl.appendChild(weatherIcon)

  //temp 
  var forecastTemp = document.createElement("span")
  temperatureEl.textContent = "Temperature: " + weather.main.temp + " °F"
  temperatureEl.classList = "list-group-item"

  // wind
  var forecastWind = document.createElement("span")
  windSpeedEl.textContent = "Wind Speed: " + weather.wind.speed + " MPH"
  windSpeedEl.classList = "list-group-item"

  // humidity
  var forecastHumidity = document.createElement("span")
  humidityEl.textContent = "Humidity: " + weather.main.humidity + " %"
  humidityEl.classList = "list-group-item"

  // adds elements to container 
  forecastContainerEl.appendChild(forecastTemp)
  forecastContainerEl.appendChild(forecastHumidity)
  forecastContainerEl.appendChild(forecastWind)

    }
}

function searchHistory(searchHistory) {
  searchHistoryEl = document.createElement("button");
  searchHistoryEl.textContent = searchHistory
  searchHistoryEl.classList = 'd-flex w100 btn-light border p-2'
  searchHistoryEl.setAttribute('data-city', searchHistory)
  searchHistoryEl.setAttribute('type', 'submit')
  searchHistoryEl.prepend(searchHistory)
}

function searchHistoryHandler(event) {
  let city = event.target.getAttribute('data-city')
  if(city) {
    getCityWeather(city)
    getCity(city)
  }
}

// HANDLERS
searchBtn.addEventListener("submit", formSubmitHandler);
searchHistoryBtn.addEventListener("submit", searchHistoryHandler);