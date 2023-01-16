function weatherSearch() {
    var cityName = 
fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=10&appid=fdb3fbd4a502e98a93742bb761dbcb16`)
  .then((response) => response.json())
  .then((data) => {
    
  });

}

