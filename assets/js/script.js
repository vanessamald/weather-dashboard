// DOM elements for seach bar 
var citySearchEl = document.getElementById('city')
var cityFormEl = document.querySelector('#city-form')
var searchBtn = document.getElementById('search-btn')
var dayForecastContainer = document.querySelector('#day-forecast')

// DOM elements to display weather
var cityName1 = document.querySelector(".city-name1")
var weatherDate = document.querySelector(".date");
var displayicon1 = document.querySelector(".icon")
var cityName = document.querySelector(".city-name")
//var date = document.querySelector(".date");
var temperature = document.querySelector(".temp")
var wind = document.querySelector(".wind")
var humidity = document.querySelector(".humidity")
const kelvin = 273;

// top cities btn DOM
var topCityBtn = document.querySelector("#top-city-btn");

// forecast container to append elements to 
var forecast = document.querySelector("#forecast")

//var weatherArray = [];

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

        // convert unix date (from stackoverflow)
        var a = new Date(data.dt * 1000);
        var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
        var year = a.getFullYear();
        var month = months[a.getMonth()];
        var date = a.getDate();
        var hour = a.getHours();
        var min = a.getMinutes();
        var sec = a.getSeconds();
        var time = date + ' ' + month + ' ' + year + ' ' + hour + ':' + min + ':' + sec ;
        weatherDate.textContent = time;
        console.log(time);

        //display weather icon TESTING
        // icon.innerHTML = data.weather[0].icon; 
        var weatherIcon = document.createElement("img");
        //weatherIcon.classList = "float-right";
        var image1 = data.weather[0].icon; 
        weatherIcon.src = "http://openweathermap.org/img/wn/" + image1 + ".png";

        // display temp in farenheit
        temperature.textContent =  "Temperature: " + Math.floor((data.main.temp - kelvin)* 1.8 + 32) + "°F";

        // display wind 
        wind.textContent = "Wind: " + data.wind.speed + " mph";

        // display humidity
        humidity.textContent = "Humidity: " + data.main.humidity;

        // append weather icon 
        displayicon1.appendChild(weatherIcon);
        
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

// get 5 day forecast
var getForecast = function(city) {
    var forecastUrl = "http://api.openweathermap.org/data/2.5/forecast?q=" + city + "&appid=d7e25feadbb98d58fea6663edfb99b38";

    fetch(forecastUrl)
        .then((response) => {
        return response.json();
      })
        .then((data) => {
            console.log(data);
            //console.log(data.list[6]);
            console.log(data.city.name);

            // clear content TESTING
            forecast.textContent = "";

            for (var i=0; i < 40; i+=8) {
            console.log(data.list[i]);
            //console.log(data.list[i].dt_txt);

            // create a container to display 5 day forecast
            var forecastContainer = document.createElement("div");
            forecastContainer.classList = "card text-white bg-info mb-3 col" ;
            var date = new Date(data.list[i].dt_txt).toLocaleDateString();
            forecastContainer.textContent = date;
            console.log(date);


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

// function to display popular cities 

   // var apiUrl = "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=d7e25feadbb98d58fea6663edfb99b38";
   // var forecastUrl = "http://api.openweathermap.org/data/2.5/forecast?q=" + city + "&appid=d7e25feadbb98d58fea6663edfb99b38";
var cityBtn = function(event) {
		var data = event.target.getAttribute("data");
	if (data == 'la') {
    const city = 'los angeles';
		console.log("TESTING LA CLICK")
    getWeather(city);
    getForecast(city);
	}
	if (data == 'new-york') {
		console.log("TESTING NEW YORK CLICK");
    //const city = 'new york';
    //getWeather(city);
    //getForecast(city);
		//displayStock(stockArray, [1]);
	}
	if (data == 'chicago') {
		console.log("TESTING CHICAGO CLICK")
		//displayStock(stockArray, [2]);
	}
	if (data == 'houston') {
		console.log("TESTING HOUSTON CLICK")
		//displayStock(stockArray, [3]);
  
	}   
  
} 
topCityBtn.addEventListener("click", cityBtn);
