const API_KEY = "6d1b3b43eef2ae295ed0ff8a768a222d";
const COORDS = "coords";
const weather = document.querySelector(".js-weather");

function saveCoords(coordsObj) {
  localStorage.setItem(COORDS, JSON.stringify(coordsObj));
}
function getWeather(lat, lng) {
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${API_KEY}&units=metric`
  )
    .then(function (response) {
      //console.log(response.json());
      return response.json();
    })
    .then(function (json) {
      const weth = json.weather[0].main;
      const temp = json.main.temp;
      const place = json.name;
      const maxtmp = json.main.temp_max;
      const mintmp = json.main.temp_min;
      weather.innerText = `NoW : ${weth} ${temp}℃   ${place}\n ToP : ${maxtmp}℃  BottoM : ${mintmp}℃ `;
    });
}

function handleGeoSucces(position) {
  console.log(position);
  const latitude = position.coords.latitude;
  const longitude = position.coords.longitude;
  const coordsObj = {
    latitude,
    longitude,
  };
  saveCoords(coordsObj);
  getWeather(latitude, longitude);
}
function handleGeoError() {
  console.log("Can't access geo location");
}

function askForCoords() {
  navigator.geolocation.getCurrentPosition(handleGeoSucces, handleGeoError);
}

function loadCoords() {
  const loadCoords = localStorage.getItem(COORDS);
  if (loadCoords === null) {
    askForCoords();
  } else {
    //getWeather
    const parseCoords = JSON.parse(loadCoords);
    getWeather(parseCoords.latitude, parseCoords.longitude);
  }
}

function init() {
  loadCoords();
}

init();
