const cities = [];
const searchFormEl = document.querySelector('#city-search-form');
const cityInputEl = document.querySelector('#city')
const searchHistoryBtn = document.querySelector('#past-search-btn');
const citySearchInputEl = document.querySelector('#searched-city')
const weatherContainerEl = document.querySelector('#current-weather-container');
const forecastTitle = document.querySelector('#forecast')
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
  searchHistory(city)
}

function saveSearch(){
  localStorage.setItem("cities", JSON.stringify(cities))
}

function getCityWeather(city) {
  const apiKey = "df4a6db3696fc1bf82eecc368539e7a3";
  const apiURL = `https://api.openweathermap.org/data/forecast?q=${city}&units=imperial&appid=${apiKey}`
  fetch(apiURL)
  .then(function(response) {
    response.json().then(function(data) {
      displayWeather(data, city)
    })
  })
}

function getCity(city) {
const apiKey = "df4a6db3696fc1bf82eecc368539e7a3";
const apiURL = `https://api.openweathermap.org/data/forecast?q=${city}&units=imperial&appid=${apiKey}`
  fetch(apiURL)
  .then(function(response) {
    response.json().then(function(data) {
      displayForecast(data)
    })
  })
}

function displayWeather(weather, citySearch) {
  console.log('hello world')
  weatherContainerEl.textContent = ""
  citySearchInputEl.textContent=citySearch

  //date 
  const currentDate = document.createElement("h4")
  currentDate.textContent=" (" + moment(weather.dt.value).format("MMM D, YYYY") + ") "
  currentDate.classList = "card-header text-center"
  citySearchInputEl.appendChild(currentDate)

  //image
  var weatherIcon = document.createElement("img")
  weatherIcon.classList = "card-body text-center"
  weatherIcon.setAttribute("src", `https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`)
  citySearchInputEl.appendChild(weatherIcon)

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
}

function displayForecast(weather) {
  // resets to empty form 
  forecastContainerEl.textContent = ""
  forecastTitle.textContent = "5 Day Forecast:"

  let forecast = weather.list 
    for(var i=5; i < forecast.length; i=i+8) {
      let dailyForecast = forecast[i]

      const forecastEl = document.createElement("div")
      forecastEl.classList = "card bg-primary text-light m-2"
      
  //date 
  const forecastDate = document.createElement("h4")
  forecastDate.textContent = moment.unix(dailyForecast.dt).format("MMM D, YYYY")
  forecastDate.classList = "card-header text-center"
  forecastEl.appendChild(forecastDate)

  //image
  var weatherIcon = document.createElement("img")
  weatherIcon.classList = "card-body text-center"
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
  searchHistoryEl.classList = "d-flex w100 btn-light border p-2"
  searchHistoryEl.setAttribute('data-city', searchHistory)
  searchHistoryEl.setAttribute("type", "submit")
  searchHistoryEl.prepend(searchHistory)
}

function searchHistoryHandler(event) {
  let city = event.target.getAttribute("data-city")
  if(city) {
    getCityWeather(city)
    getCity(city)
  }
}

// HANDLERS
searchFormEl.addEventListener("submit", formSubmitHandler);
searchHistoryBtn.addEventListener("click", searchHistoryHandler);