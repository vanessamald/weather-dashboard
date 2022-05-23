// DOM elements for seach bar 
var citySearchEl = document.getElementById('city')
var cityFormEl = document.querySelector('#city-form')
var searchBtn = document.getElementById('search-btn')
var dayForecastContainer = document.querySelector('#day-forecast')

// DOM elements to display weather
var cityName1 = document.querySelector(".city-name1")

//var icon = document.querySelector(".icon1")
var cityName = document.querySelector(".city-name")
//var date = document.querySelector(".date");
var temperature = document.querySelector(".temp")
var wind = document.querySelector(".wind")
var humidity = document.querySelector(".humidity")
const kelvin = 273;

/*
// DOM elements for 5 day forecast
var date1 = document.querySelector(".date1");
var temp1 = document.querySelector(".temp1")
var humid1 = document.querySelector(".humid1")
var wind1 = document.querySelector(".wind1")

var date2 = document.querySelector(".date2");
var temp2 = document.querySelector(".temp2")
var humid2 = document.querySelector(".humid2")
var wind2 = document.querySelector(".wind2")

var date3 = document.querySelector(".date3");
var temp3 = document.querySelector(".temp3")
var humid3 = document.querySelector(".humid3")
var wind3 = document.querySelector(".wind3")


var date4 = document.querySelector(".date4");
var temp4 = document.querySelector(".temp4")
var humid4 = document.querySelector(".humid4")
var wind4 = document.querySelector(".wind4")


var date5 = document.querySelector(".date5");
var temp5 = document.querySelector(".temp5")
var humid5 = document.querySelector(".humid5")
var wind5 = document.querySelector(".wind5")
*/

// TESTING CREATING ELEMENTS
var forecast = document.querySelector("#forecast")

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

            for (var i=0; i < 40; i+=8) {
                console.log(data.list[i]);
                //console.log(data.list[i].dt_txt);

            // create a container to display 5 day forecast
            var forecastContainer = document.createElement("div");
            forecastContainer.classList = "card text-white bg-info mb-3 col" ;
            forecastContainer.textContent = "Temperature: " + Math.floor((data.list[i].main.temp - kelvin) * 1.80 + 32) + "°F";

            //display date 
            var dateList = document.createElement("li");
            dateList.classList = "flex-row align-center";
            const dateDisplay = new Date (data.list[i].dt_txt);
            const date1 = dateDisplay.getDate();
            dateList.textContent = date1;
            console.log(date1);
            

            // TESTING DATE 
            var dateList = document.createElement("li");
            dateList.classList = "flex-row align-center";
            var date = new Date(data.list[i].dt_txt).toLocaleDateString();
            dateList.textContent = date;
            console.log(date);

             

            //display weather icon
            var icondisplay = document.createElement("img");
            var icon = data.list[i].weather[0].icon; 
            icondisplay.src = "http://openweathermap.org/img/wn/" + icon + ".png";
            //console.log(icon);
            //var iconurl = "http://openweathermap.org/img/wn/" + icon + ".png";
            //icondisplay.innerhtml = iconurl;
            
            // display wind
            var wind = document.createElement("li");
            wind.classList = "flex-row align-center";
            wind.textContent = "Wind: " + data.list[i].wind.speed + " mph";

            // display humidity
            var humidity = document.createElement("li");
            humidity.classList = "flex-row align-center";
            humidity.textContent = "Humidity: " + data.list[i].main.humidity;

            // append to container
            forecastContainer.appendChild(dateList);
            forecastContainer.appendChild(icondisplay);
            forecastContainer.appendChild(wind);
            forecastContainer.appendChild(humidity);
            
            // append container to the dom
            forecast.appendChild(forecastContainer);

            }  
            
            //clear old content
            //forecastContainer.textContent = "";
          })
        };



