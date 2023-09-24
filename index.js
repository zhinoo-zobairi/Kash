let apiKey = "a0a183380df8741e35218ccc59e2fe87";
let form = document.querySelector(".search-form");
let shar = document.querySelector("#current_city");
let searchInput = document.querySelector(".search-input");
const cityMapping = {
  SANANDAJ: "SNA",
  KERMANSHAH: "KERMASHAN",
  DIYARBAKIR: "AMED",
  URFA: "RIHA",
  JAVANROOD: "JWANRRO",
  JAVANRUD: "JWANRRO",
  DEHGOLAN: "DEWLAN",
  PAVEH: "PAWA",
  MARIWAN: "MARIWAN",
  ERBIL: "HAWLER",
  "ESLAMABAD-E-GHARB": "SHABAD",
  QORVEH: "QURWA",
};
function search(event) {
  event.preventDefault();
  let newCity = searchInput.value.toUpperCase();
  let displayCity = cityMapping[newCity] || newCity;
  shar.innerHTML = `${displayCity}'s`;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${newCity}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showTemp);
}
form.addEventListener("submit", search);

function showTemp(response) {
  console.log(response.data);
  let windSpeed = document.querySelector("#wind-speed");
  let humidity = document.querySelector("#humidity");
  humidity.innerHTML = `Humidity: ${Math.round(response.data.main.humidity)}%`;
  windSpeed.innerHTML = `Wind: ${Math.round(response.data.wind.speed)} m/s`;
  let realTemp = document.querySelector("#germi");
  let description = document.querySelector("#description");
  description.innerHTML = `${response.data.weather[0].description}`;
  realTemp.innerHTML = `${Math.round(response.data.main.temp)}°C`;
}
function showLocTemp(response) {
  console.log(response.data);
  let windSpeed = document.querySelector("#wind-speed");
  let humidity = document.querySelector("#humidity");
  humidity.innerHTML = `Humidity: ${Math.round(response.data.main.humidity)}%`;
  windSpeed.innerHTML = `Wind: ${Math.round(response.data.wind.speed)} m/s`;
  let realTemp = document.querySelector("#germi");
  let description = document.querySelector("#description");
  description.innerHTML = `${response.data.weather[0].description}`;
  realTemp.innerHTML = `${Math.round(response.data.main.temp)}°C`;
  shar.innerHTML = `${response.data.name}'s`;
}

function showPos(position) {
  let apiKey = "a0a183380df8741e35218ccc59e2fe87";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showLocTemp);
}

function currentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showPos);
}

let locationButton = document.querySelector("#location-button");
locationButton.addEventListener("click", currentLocation);

let dayOfWeek = document.querySelector("#day_of_week");
let now = new Date();
let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
let daily = days[now.getDay()];
dayOfWeek.innerHTML = daily;
let timeOfDay = document.querySelector("#time_of_the_day");
let hours = now.getHours();
let minutes = now.getMinutes();
let timing;
timing = `${hours}:${minutes}`;
timeOfDay.innerHTML = timing;
