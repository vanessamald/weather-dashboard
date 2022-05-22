var citySearchEl = document.getElementById('city')
var cityFormEl = document.querySelector('#city-form')
var searchBtn = document.getElementById('search-btn')
var dayForecastContainer = document.querySelector('#day-forecast')

var temperature = document.querySelector(".temp");
const kelvin = 273;

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
  // fetch api with user city search
  var apiUrl = "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=d7e25feadbb98d58fea6663edfb99b38";

  // make a request to the url
  fetch(apiUrl)
    .then((response) => {
        return response.json();
      })
    .then((data) => {
        console.log(data);
        // display temp in farenheit
        temperature.textContent =  Math.floor(data.main.temp - kelvin)* 1.8 + 32 + "°F";
        summary.textContent = data.weather[0].description;
        loc.textContent = data.name + "," + data.sys.country;
        let icon1 = data.weather[0].icon; 
    });  
        // alert if there is an error
        //} else {
            //alert('Error: ' + response.statusText);
        };
    //})
   
    //.catch(function(error) {
        // this `.catch()` getting chained onto the end of the `.then()` method
       // alert("Unable to connect to Open Weather Map");
   // });
//};

// click event
searchBtn.addEventListener("click", formSubmitHandler);


// function to display weather info 
var displayWeather = function() {
  // check if api returned weather info
 if (weather.length === 0) {
    dayForecastContainer.textContent = "No information found";
    return;
  };
}
     