//Date, month, time

let now = new Date();
let date = now.getDate();
let hour = now.getHours();
let minutes = now.getMinutes();

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = days[now.getDay()];

let dateToday = document.querySelector(".date");
dateToday.innerHTML = `${day} ${date}`;

if (hour < 10) {
  hour = `0${hour}`;
}
if (minutes < 10) {
  minutes = `0${minutes}`;
}

let timeToday = document.querySelector(".time");
timeToday.innerHTML = `${hour}:${minutes}`;

let months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
let month = months[now.getMonth()];

let monthToday = document.querySelector(".month");
monthToday.innerHTML = `${month}`;

//forcast date
function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = [
    "Sun",
    "Mon",
    "Tue",
    "Wed",
    "Thu",
    "Fri",
    "Sat",
  ];

  
  return days[day];
}

//forecast
function displayForecast(response) {

  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#forecast");

  //let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  let forecastHTML = `<div class="row">`;
  forecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      forecastHTML += `<div class="col-2 week-day">
      <h4 class="day">${formatDay(forecastDay.dt)}</h4>
      <img
        src="https://openweathermap.org/img/wn/${forecastDay.weather[0].icon}@2x.png"
        class="day-img" alt="" width="42"
      />
      <div class="weather-forecast-temperatures">
          <span class="day-temp weather-forecast-temperature-max">${Math.round(forecastDay.temp.max)}°</span>
          <span class="day-temp weather-forecast-temperature-min">${Math.round(forecastDay.temp.min)}°</span>
      </div>
    </div>
  `};
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

//Search city (submit btn, deatails about weather for choosen city)
function getForecast(coordinates) {
  console.log(coordinates);
  let apiKey = `7746bdeabca928cfedcad71e52fd9d66`;
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&exclude={part}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

function showTemperature(response) {
  let temperature = document.querySelector(".temp");
  let wind = document.querySelector(".wind");
  let humidity = document.querySelector(".humidity");
  let weatherImg = document.querySelector(".weather-descr-img");
  let weatherDescr = document.querySelector(".weather-descr-text");

  celsiusTemp = response.data.main.temp;
  temperature.innerHTML = Math.round(celsiusTemp);
  wind.innerHTML = `Wind: ${Math.round(response.data.wind.speed)}km/h`;
  humidity.innerHTML = `Humidity: ${response.data.main.humidity}%`;
  weatherImg.setAttribute(
    "src",
    `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  weatherImg.setAttribute("alt", response.data.weather[0].description);
  weatherDescr.innerHTML = `Info: ${response.data.weather[0].description}`;
  getForecast(response.data.coord);
}
///////////////////////////////////
function submitCity(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#inputCity");
  let newCity = document.querySelector(".your-city");
  let temperature = document.querySelector(".temp");

  let empt = searchInput.value;
  if (empt === "") {
    newCity.innerHTML = `Enter city name`;
    temperature.innerHTML = `-`;
  } else {
    newCity.innerHTML = `${searchInput.value}`;
    searchCity(searchInput.value);
  }
}

function searchCity(city) {
  let apiKey = "2bd326a60dc89a53287e446e819664df";
  let ApiLink = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
  axios.get(ApiLink).then(showTemperature);
}

//////////////////////////////////

let submitBtn = document.querySelector(".enterCity");
submitBtn.addEventListener("submit", submitCity, false);

//Search current city (current btn, deatails about weather)
function showWeather(response) {
  let yourCity = document.querySelector(".your-city");
  let temperature = document.querySelector(".temp");
  let wind = document.querySelector(".wind");
  let humidity = document.querySelector(".humidity");
  let weatherImg = document.querySelector(".weather-descr-img");
  let weatherDescr = document.querySelector(".weather-descr-text");

  yourCity.innerHTML = `${response.data.name}`;
  celsiusTemp = Math.round(response.data.main.temp);
  temperature.innerHTML = `${celsiusTemp}`;
  wind.innerHTML = `Wind: ${Math.round(response.data.wind.speed)}km/h`;
  humidity.innerHTML = `Humidity: ${response.data.main.humidity}%`;
  weatherImg.setAttribute(
    "src",
    `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  weatherImg.setAttribute("alt", response.data.weather[0].description);
  weatherDescr.innerHTML = `Info: ${response.data.weather[0].description}`;
}

function retrievePosition(position) {
  let apiKey = "2bd326a60dc89a53287e446e819664df";
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
  axios.get(url).then(showWeather);
}

function getCurrentpos() {
  document.getElementById("inputCity").value = null;
  navigator.geolocation.getCurrentPosition(retrievePosition);
}

getCurrentpos();
let button = document.querySelector("#current");
button.addEventListener("click", getCurrentpos);

//change C to F and opposite

function displayFahrenheit(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector(".temp");
  let fahrenheitTemp = (celsiusTemp * 9) / 5 + 32;

  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  temperatureElement.innerHTML = Math.round(fahrenheitTemp);
}

function displayCelsius(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector(".temp");
  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
  temperatureElement.innerHTML = Math.round(celsiusTemp);
}

let celsiusTemp = null;

let fahrenheitLink = document.querySelector("#fahrenheit");
fahrenheitLink.addEventListener("click", displayFahrenheit);

let celsiusLink = document.querySelector("#celsius");
celsiusLink.addEventListener("click", displayCelsius);

searchCity("Lisbon");
