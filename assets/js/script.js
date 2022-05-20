var citySearchEl = document.getElementById('city')
var cityFormEl = document.querySelector('#city-form')
var searchBtn = document.getElementById('search-btn')
var dayForecastContainer = document.querySelector('#day-forecast')

var weatherArray = [];


// TESTING THIS CODE WORKS!!!!
var formSubmitHandler = function(event) {
  event.preventDefault();
  // get value from input element
  var city = citySearchEl.value.trim();
  console.log(city);
  if (city) {
      getWeather(city);
      citySearchEl.value= "";
  } else {
      alert("Please enter a valid city");
  }
};

var getWeather = function(city) {
  // format the github api url
  var apiUrl = "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=d7e25feadbb98d58fea6663edfb99b38";

  // make a request to the url
  fetch(apiUrl)

    //TESTING HERE
    .then(response => response.json())
	  .then(response => console.log(response))
    //TESTING END
}
searchBtn.addEventListener("click", formSubmitHandler);