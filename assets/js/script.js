// DOM elements for seach bar 
var citySearchEl = document.getElementById('city')
var cityFormEl = document.querySelector('#city-form')
var searchBtn = document.getElementById('search-btn')
var dayForecastContainer = document.querySelector('#day-forecast')

// search history
var searchHistoryEl = document.querySelector("#search-history");
var cityHistory = JSON.parse(localStorage.getItem('cityHistory'));
//testing
var historyBtn = document.querySelector("#historyBtn");

var searched = JSON.parse(localStorage.getItem('city'));
//var userHistory = JSON.stringify(cityArray.splice(','));



// DOM elements to display current weather
//var cityName1 = document.querySelector(".city-name1")
var weatherDate = document.querySelector(".date");
var displayicon1 = document.querySelector(".icon")
var cityName = document.querySelector(".city-name")
var temperature = document.querySelector(".temp")
var wind = document.querySelector(".wind")
var humidity = document.querySelector(".humidity")
var uvi = document.querySelector(".uvi");

// kelvin variable to convert temperature
const kelvin = 273;

// top cities buttons 
var topCityBtn = document.querySelector("#top-city-btn");
var topCityBtn2 = document.querySelector("#top-city-btn2");
var topCityBtn3 = document.querySelector("#top-city-btn3");
var topCityBtn4 = document.querySelector("#top-city-btn4");
var topCityBtn5 = document.querySelector("#top-city-btn5");

// forecast container to append elements to 
var forecast = document.querySelector("#forecast")

var cityArray = [];

// function to get city input from user
var formSubmitHandler = function(event) {
  event.preventDefault();
  // get value from input element
  var city = citySearchEl.value.trim();
  console.log(city);

  // create an array of user search history
  cityArray.push(city); 
  //console.log(cityArray);
    // local storage 
        var userHistory = JSON.stringify((cityArray).slice(','));
        localStorage.setItem('city', userHistory); 
        var searched = JSON.parse(localStorage.getItem('city'));
        console.log(searched);

        var storedCities = searched; //.splice(',');
        searchHistoryEl.textContent = storedCities + " ";

        /*
        // create a list of user city history search
        var cityList = document.createElement("a");
        cityList.classList = "card text-white bg-info mb-3 col";
        cityList.setAttribute = ("id", "historyBtn");
        cityList.textContent = searched;

        searchHistoryEl.appendChild(cityList);
        */

        //var historyBtn = document.querySelector("#historyBtn");

        //historyBtn.addEventListener("click", getWeather);
       
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

        // add city searches to local storage TESTING HERE
        //localStorage.setItem('cityHistory', JSON.stringify(city));

        // get lat and lon for city searched
        var lat = data.coord.lat; 
        var lon = data.coord.lon;
        console.log(lat);
        console.log(lon);
        // use lat and lon to fetch uvi info 
        getUvIndex(lat, lon);

        // clear icon after each search 
        displayicon1.textContent = "";  

        // display city name
        cityName.textContent = data.name;

        // convert unix date (from stackoverflow)
        var a = new Date(data.dt * 1000);
        var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
        var year = a.getFullYear();
        var month = months[a.getMonth()];
        var date = a.getDate();
        var time = date + ' ' + month + ' ' + year + ' ' ;
        weatherDate.textContent = time;
        console.log(time);

        //display current weather icon 
        var weatherIcon = document.createElement("img");
        var image1 = data.weather[0].icon; 
        weatherIcon.src = "https://openweathermap.org/img/wn/" + image1 + ".png";

        // display temp in farenheit
        temperature.textContent =  "Temperature: " + Math.floor((data.main.temp - kelvin)* 1.8 + 32) + "°F";

        // display wind 
        wind.textContent = "Wind: " + data.wind.speed + " mph";

        // display humidity
        humidity.textContent = "Humidity: " + data.main.humidity + "%";

        // append weather icon 
        displayicon1.appendChild(weatherIcon);
       });  
    };

// click event
searchBtn.addEventListener("click", formSubmitHandler);

// get 5 day forecast
var getForecast = function(city) {
    var forecastUrl = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&appid=d7e25feadbb98d58fea6663edfb99b38";

    fetch(forecastUrl)
        .then((response) => {
        return response.json();
      })
        .then((data) => {
            console.log(data);
            //console.log(data.city.name);

            // clear content
            forecast.textContent = "";

            // loop through data to display 5 day weather forecast
            for (var i=5; i < 40; i+=8) {
            console.log(data.list[i]);

            // create a container to display 5 day forecast
            var forecastContainer = document.createElement("div");
            forecastContainer.classList = "card text-white bg-info mb-3 col";
            var date = new Date(data.list[i].dt_txt).toLocaleDateString();
            forecastContainer.textContent = date;
            //console.log(date);

            // convert temperature to farenheit
            var forecastTemp = document.createElement("li");
            forecastTemp.classList = "flex-row align-center";
            forecastTemp.textContent = "Temperature: " + Math.floor((data.list[i].main.temp - kelvin) * 1.80 + 32) + "°F";

            //display weather icon
            var icondisplay = document.createElement("img");
            var icon = data.list[i].weather[0].icon; 
            icondisplay.src = "http://openweathermap.org/img/wn/" + icon + ".png";
            
            // display wind
            var wind = document.createElement("li");
            wind.classList = "flex-row align-center";
            wind.textContent = "Wind: " + data.list[i].wind.speed + " mph";

            // display humidity
            var humidity = document.createElement("li");
            humidity.classList = "flex-row align-center";
            humidity.textContent = "Humidity: " + data.list[i].main.humidity;

            // append to container
            forecastContainer.appendChild(icondisplay);
            forecastContainer.appendChild(forecastTemp);
            forecastContainer.appendChild(wind);
            forecastContainer.appendChild(humidity);
            
            // append container to the dom
            forecast.appendChild(forecastContainer);

            }  
          })
        };

// function to display top city weather
var cityBtn = function(event) {
  console.log("CLICK WORKS");
	var data = event.target.getAttribute("data");

  
	if (data == 'la') {
    const city = 'los angeles';
		console.log("TESTING LA CLICK")
    getWeather(city);
    getForecast(city);
  }
	if (data == 'newyork') {
		console.log("TESTING NEW YORK CLICK");
    const city = 'new york';
    getWeather(city);
    getForecast(city);
	}
	if (data == 'chicago') {
		console.log("TESTING CHICAGO CLICK");
    const city = 'chicago';
    getWeather(city);
    getForecast(city);
	}
	if (data == 'houston') {
		console.log("TESTING HOUSTON CLICK")
    const city = 'houston';
    getWeather(city);
    getForecast(city);
	}   
if (data == 'seattle') {
	console.log("TESTING SEATTLE CLICK")
  const city = 'seattle';
  getWeather(city);
  getForecast(city);
	}  
} 
// click event for top cities
topCityBtn.addEventListener("click", cityBtn);
topCityBtn2.addEventListener("click", cityBtn);
topCityBtn3.addEventListener("click", cityBtn);
topCityBtn4.addEventListener("click", cityBtn);
topCityBtn5.addEventListener("click", cityBtn);

/*
// TESTING FOR HISTORY 
var searchClick = function() {
  //for (i=0; i > 5; i++) {
  let city = searched;
  getWeather(city);
  //}
};

cityList.addEventListener("click", searchClick);
*/

// uv index function
var getUvIndex = function(lat, lon) {
  var uvUrl = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&appid=d7e25feadbb98d58fea6663edfb99b38";

    // make a request to the url
    fetch(uvUrl)
    .then((response) => {
        return response.json();
      })
    .then((data) => {
        console.log(data);
    
      // display uvi
      const uvdisplay = data.current.uvi;
      uvi.textContent = "UVI: " + uvdisplay;

      // add color indicator for uvi
      if ( uvdisplay > 5) {
        uvi.classList.add("red-uvi");
      }
      if (uvdisplay < 5) {
        uvi.classList.add("green-uvi");
      }
  })
};
