const cities = [];
const searchFormEl = document.querySelector('#city-search-form');
const cityInputEl = document.querySelector('#city');
const searchHistoryBtn = document.querySelector('#past-search-button');
const citySearchInputEl = document.querySelector('#searched-city');
const weatherContainerEl = document.querySelector('#current-weather-container');
const forecastTitle = document.querySelector('#forecast');
const forecastContainerEl = document.querySelector('#five-day-container');


function formatDate (date){

}

// Necessary Functions 
function formSubmitHandler(event){
  event.preventDefault();
  var city = cityInputEl.value.trim();
  if(city){
    getCityWeather(city);
    getCity(city);
    cities.unshift({city});
    cityInputEl.value = "";
  } else {
    alert("Please enter a City");
  }
  saveSearch();
  searchHistory(city);
}

function saveSearch(){
  localStorage.setItem("cities", JSON.stringify(cities));
}

function getCityWeather(city) {
  const apiKey = "df4a6db3696fc1bf82eecc368539e7a3";
  const apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apiKey}`;
  fetch(apiURL)
    .then(function(response) {
      response.json().then(function(data) {
        displayWeather(data, city);
      });
    });
}

function getCity(city) {
  const apiKey = "df4a6db3696fc1bf82eecc368539e7a3";
  const apiURL = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=imperial&appid=${apiKey}`;
  fetch(apiURL)
    .then(function(response) {
      response.json().then(function(data) {
        displayForecast(data);
      });
    });
}

function displayWeather(weather, citySearch) {
  console.log('hello world');
  weatherContainerEl.textContent = "";
  citySearchInputEl.textContent = citySearch;

  //date 
  const currentDate = document.createElement("h4");
  currentDate.textContent = " (" + moment(weather.dt.value).format("MMM DD, YYYY") + ") ";
  citySearchInputEl.appendChild(currentDate);

  //image
  var weatherIcon = document.createElement("img");
  weatherIcon.setAttribute("src", `https://openweathermap.org/img/wn/${weather.weather[0].icon}.png`);
  citySearchInputEl.appendChild(weatherIcon);

  //temp 
  var temperatureEl = document.createElement("span");
  temperatureEl.textContent = "Temperature: " + weather.main.temp + " °F";
  temperatureEl.classList = "list-group-item";

  // wind
  var windSpeedEl = document.createElement("span");
  windSpeedEl.textContent = "Wind Speed: " + weather.wind.speed + " MPH";
  windSpeedEl.classList = "list-group-item";

  // humidity
  var humidityEl = document.createElement("span");
  humidityEl.textContent = "Humidity: " + weather.main.humidity + " %";
  humidityEl.classList = "list-group-item";

  weatherContainerEl.appendChild(temperatureEl);
  weatherContainerEl.appendChild(humidityEl);
  weatherContainerEl.appendChild(windSpeedEl);

  var lat = weather.coord.lat;
  var lon = weather.coord.lon;
  getUvIndex(lat,lon);
}

function displayForecast(weather) {
  // resets to empty form 
  forecastContainerEl.innerHTML = "";
  forecastTitle.textContent = "5 Day Forecast:";

  var forecast = weather.list;
  for(var i = 5; i < forecast.length; i = i + 8) {
    var dailyForecast = forecast

      const forecastEl = document.createElement("div")
      forecastEl.classList = "card bg-primary text-light m-2"
      
  //date 
  const forecastDate = document.createElement("h4")
  console.log(dailyForecast[i].dt_txt)
  formatDate(dailyForecast[i].dt_txt)
  forecastDate.textContent = dailyForecast[i].dt_txt;
  forecastDate.classList = "card-header text-center"
  forecastEl.appendChild(forecastDate)

  //image
  var weatherIcon = document.createElement("img")
  weatherIcon.classList = "card-body text-center"
  console.log(`https://openweathermap.org/img/wn/${weather.list[0].weather[0].icon}@2x.png`)
  weatherIcon.setAttribute("src", `https://openweathermap.org/img/wn/${weather.list[0].weather[0].icon}@2x.png`)
  forecastEl.appendChild(weatherIcon)

  //temp 
  var forecastTemp = document.createElement("span")
  forecastTemp.textContent = "Temperature: " + weather.list[0].main.temp + " °F"
  forecastTemp.classList = "list-group-item"

  // wind
  var forecastWind = document.createElement("span")
  forecastWind.textContent = "Wind Speed: " + weather.list[0].wind.speed + " MPH"
  forecastWind.classList = "list-group-item"

  // humidity
  var forecastHumidity = document.createElement("span")
  forecastHumidity.textContent = "Humidity: " + weather.list[0].main.humidity + " %"
  forecastHumidity.classList = "list-group-item"

  // adds elements to container 
  var weatherCard = document.createElement("div")
  // weatherCard.classList.add("bg-dark text-white")
  weatherCard.appendChild(forecastTemp)
  weatherCard.appendChild(forecastHumidity)
  weatherCard.appendChild(forecastWind)
  weatherCard.appendChild(forecastEl)
  forecastContainerEl.appendChild(weatherCard)


    }
}

function searchHistory(searchHistory) {
  searchHistoryEl = document.createElement("button");
  searchHistoryEl.innerHTML = searchHistory
  searchHistoryEl.classList = "d-flex w100 btn-light border p-2"
  searchHistoryEl.setAttribute('data-city', searchHistory)
  searchHistoryEl.setAttribute("type", "submit")
  // searchHistoryEl.appendChild(searchHistory)
  document.querySelector('#past-search-button').prepend(searchHistoryEl);
}

function searchHistoryHandler(event) {
  var city = event.target.getAttribute("data-city")
  if(city) {
    getCityWeather(city)
    getCity(city)
  }
}

// HANDLERS
searchFormEl.addEventListener("submit", formSubmitHandler);
searchHistoryBtn?.addEventListener("click", searchHistoryHandler);