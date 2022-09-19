///////1
let now = new Date();
let date = now.getDate();
let hour = now.getHours();
let minutes = now.getMinutes();

let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
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
  "Jan",
  "Feb",
  "March",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
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
    temperature.innerHTML = Math.round(response.data.main.temp);
    let wind = document.querySelector(".wind");
    wind.innerHTML = `Wind: ${Math.round(response.data.wind.speed)}km/h`;
    let humidity = document.querySelector(".humidity");
    humidity.innerHTML = `Humidity: ${response.data.main.humidity}%`;
    console.log(response);
  }
  let newCity = document.querySelector(".your-city");
  newCity.innerHTML = `${searchInput.value}`;

  let ApiLink = `https://api.openweathermap.org/data/2.5/weather?q=${searchInput.value}&units=metric&appid=${apiKey}`;
  axios.get(ApiLink).then(showTemperature);
}

let submitBtn = document.querySelector(".enterCity");
submitBtn.addEventListener("submit", submitCity);

//////////////3

//function convertToFarhenheit(event) {
//event.preventDefault();
//let temperatureElement = document.querySelector(".temp");
//temperatureElement.innerHTML = 66;
//}

//function convertToCelsius(event) {
//event.preventDefault();
//let temperatureElement = document.querySelector(".temp");
//temperatureElement.innerHTML = 19;
//}

//let fahrenheit = document.querySelector("#fahrenheit");
//fahrenheit.addEventListener("click", convertToFarhenheit);

//let celsius = document.querySelector("#celsius");
//celsius.addEventListener("click", convertToCelsius);

//5hw

function showWeather(response) {
  let yourCity = document.querySelector(".your-city");
  let temperature = document.querySelector(".temp");
  yourCity.innerHTML = `${response.data.name}`;
  temperature.innerHTML = Math.round(response.data.main.temp);
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
