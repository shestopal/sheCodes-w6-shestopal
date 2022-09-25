///////1
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

///////2
function submitCity(event) {
  event.preventDefault();
  let apiKey = "2bd326a60dc89a53287e446e819664df";
  let searchInput = document.querySelector("#inputCity");

  function showTemperature(response) {
    let temperature = document.querySelector(".temp");

    celsiusTemp = response.data.main.temp;

    temperature.innerHTML = Math.round(celsiusTemp);
    let wind = document.querySelector(".wind");
    wind.innerHTML = `Wind: ${Math.round(response.data.wind.speed)}km/h`;
    let humidity = document.querySelector(".humidity");
    humidity.innerHTML = `Humidity: ${response.data.main.humidity}%`;

    // let weatherImg = document.querySelector(".weather-img");
    //weatherImg.setAttribute(
    // "src",
    //`https://openweathermap.org/img/wn/${response.data.weather[0].//icon}@2x.png`);

    console.log(response);
  }
  let newCity = document.querySelector(".your-city");
  newCity.innerHTML = `${searchInput.value}`;

  let ApiLink = `https://api.openweathermap.org/data/2.5/weather?q=${searchInput.value}&units=metric&appid=${apiKey}`;
  axios.get(ApiLink).then(showTemperature);
}

let submitBtn = document.querySelector(".enterCity");
submitBtn.addEventListener("submit", submitCity);

//5hw

function showWeather(response) {
  let yourCity = document.querySelector(".your-city");
  yourCity.innerHTML = `${response.data.name}`;
  let temperature = document.querySelector(".temp");

  celsiusTemp = Math.round(response.data.main.temp);

  temperature.innerHTML = `${celsiusTemp}`;
  let wind = document.querySelector(".wind");
  wind.innerHTML = `Wind: ${Math.round(response.data.wind.speed)}km/h`;
  let humidity = document.querySelector(".humidity");
  humidity.innerHTML = `Humidity: ${response.data.main.humidity}%`;
  console.log(response);
}

function retrievePosition(position) {
  let apiKey = "2bd326a60dc89a53287e446e819664df";
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
  axios.get(url).then(showWeather);
}

function getCurrentpos() {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(retrievePosition);
}

let button = document.querySelector("#current");
button.addEventListener("click", getCurrentpos);

//////////////3

function displayFahrenheit(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector(".temp");
  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  let fahrenheitTemp = (celsiusTemp * 9) / 5 + 32;
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

submitCity("Lisbon");
