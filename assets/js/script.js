// DOM elements for seach bar 
var citySearchEl = document.getElementById('city')
var cityFormEl = document.querySelector('#city-form')
var searchBtn = document.getElementById('search-btn')
var dayForecastContainer = document.querySelector('#day-forecast')

// DOM elements to display weather
var cityName1 = document.querySelector(".city-name1")

var icon = document.querySelector(".icon")
var cityName = document.querySelector(".city-name")
var date = document.querySelector(".date");
var temperature = document.querySelector(".temp")
var wind = document.querySelector(".wind")
var humidity = document.querySelector(".humidity")
const kelvin = 273;

// DOM elements for 5 day forecast
var date1 = document.querySelector(".date1");
var temp1 = document.querySelector(".temp1")
var humid1 = document.querySelector(".humid1")
var wind1 = document.querySelector(".wind1")

var weatherArray = [];


// function to get city input from user
var formSubmitHandler = function(event) {
  event.preventDefault();
  // get value from input element
  var city = citySearchEl.value.trim();
  console.log(city);
  if (city) {
      getWeather(city);
      getForecast(city);
      citySearchEl.value= "";
    // alert user if there input in invalid
  } else {
      alert("Please enter a valid city");
  }
};

// function to fetch api data and display daily forecast
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

        // display city name
        cityName.textContent = data.name;

        //display date 


        //display weather icon
       // icon.innerHTML = data.weather[0].icon; 

        // display temp in farenheit
        temperature.textContent =  "Temperature: " + Math.floor((data.main.temp - kelvin)* 1.8 + 32) + "°F";

        // display wind 
        wind.textContent = "Wind: " + data.wind.speed + " mph";

        // display humidity
        humidity.textContent = "Humidity: " + data.main.humidity;
        
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

/*
// function to display weather info 
var displayWeather = function() {
  // check if api returned weather info
 if (weather.length === 0) {
    dayForecastContainer.textContent = "No information found";
    return;
  };
}
*/

// get 5 day forecast
var getForecast = function(city) {
    var forecastUrl = "http://api.openweathermap.org/data/2.5/forecast?q=" + city + "&appid=d7e25feadbb98d58fea6663edfb99b38";

    fetch(forecastUrl)
        .then((response) => {
        return response.json();
      })
        .then((data) => {
            console.log(data);
            console.log(data.list[6]);
            console.log(data.city.name);
            console.log(data.list[6].dt_txt)

            for (var i=6; i < 10; i++) {
                //console.log(data.list[i]);
            // display city name
            cityName1.textContent = data.city.name;

            //display date 
            //date1.textContent = data.list[6].dt_txt;
        
            //display weather icon
            // icon.innerHTML = data.weather[0].icon; 
        
            // display temp in farenheit
            temp1.textContent = "Temperature: " + Math.floor((data.list[i].main.temp - kelvin)* 1.8 + 32) + "°F";
        
            // display wind 
            wind1.textContent = "Wind: " + data.list[i].wind.speed + " mph";
        
            // display humidity
            humid1.textContent = "Humidity: " + data.list[i].main.humidity;
    }
})
};


