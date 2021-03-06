const api = {
  key: "0e7bd3d49e934934dd7c6b1ae8de86ef",
  base: "https://api.openweathermap.org/data/2.5/",
  units: "imperial"
}

const searchbox = document.querySelector('.search-box');
searchbox.addEventListener('keypress', setQuery);

function setQuery(evt) {
  if (evt.keyCode == 13) {
    getResults(searchbox.value);
    //console.log(searchbox.value);
  }
}

function getResults (query) {
  fetch(`${api.base}weather?q=${query}&units=${api.units}&appid=${api.key}`)
  //fetch(`${api.base}weather?q=${query}zip=${query}&units=${api.units}&appid=${api.key}`)
    .then(weather => {
      return weather.json();
    }).then(displayResults);
}


function displayResults (weather) {
  console.log(weather);
  let city = document.querySelector('.location .city');
  city.innerText = `${weather.name}, ${weather.sys.country}`;

  let now = new Date();
  let hr = now.getHours();
  let min = now.getMinutes();
  if (min < 10) {
    min = "0" + min;
  }
  let ampm = "am";
  if (hr > 12) {
    hr -= 12;
    ampm = "pm";
  }

  function degToCompass(num) {
      var deg = `${weather.wind.deg}`;
//Tip: If you would like to use eight sectors instead of 16, with a shorter lookup table, divide by 45 degrees instead of 22.5 degrees.
      var val = Math.floor((deg / 22.5) + 0.5);
// ONLY 8 COMPASS POINTS BEING USED
      var arr = ['↑ N', '↗ NE', '→ E', '↘ SE', '↓ S', '↙ SW', '← W', '↖ NW'];
      return arr[(val % 8)];
  }


  let date = document.querySelector('.location .date');
  date.innerHTML = dateBuilder(now) + " <br> Current Time: " + hr + ":" + min + ampm;
  //date.innerHTML = `${dateBuilder(now)}<span class="current-time"> //current time</span>`;
  //let time = document.querySelector('.location .date .current-time');
  //time.innerText = now.getHours() + ":" + now.getMinutes();

// REMOVED BELOW 2 LINES BECAUSE ICON SPAN ADDED NEXT TO THE CURRENT TEMP IN 1 VAR.
  //let locationIcon = document.querySelector('.current .weather-icon');
  //locationIcon.innerHTML = `<img src="icons/${weather.weather[0].icon}.png"/>`;

// CURRENT temperature and related icon
  let temp = document.querySelector('.current .temp');
  temp.innerHTML = `<span class="weather-icon"><img src="https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png"/></span>${Math.round(weather.main.temp)}<span class="deg-symbol-main">°F</span>`;
// SHORT DESCRITOPN OF WEATHER
  let weather_el = document.querySelector('.current .weather');
  weather_el.innerHTML = `${weather.weather[0].main}<span>: </span><span class="descript"></span>`;
// LOND DESCRIPTION OF THE WEATHER
  let weather_desc = document.querySelector('.current .weather .descript');
  weather_desc.innerHTML = weather.weather[0].description;
// FEELS LIKE temperature
  let feellike = document.querySelector('.feels_like_temp');
  feellike.innerHTML = `<span class="temp-icon"><i class="fas fa-thermometer-half"></i></span> Feels Like ${Math.round(weather.main.feels_like)}<span class="deg-symbol-sm"> °F</span>`;
// CURRENT HI / LOW TEMPERATURE
  let hilow = document.querySelector('.hi-low');
  hilow.innerHTML = `Low ${Math.round(weather.main.temp_min)}<span class="deg-symbol-sm"> °F</span> / High ${Math.round(weather.main.temp_max)}<span class="deg-symbol-sm"> °F</span>`;

  let wind = document.querySelector('.wind-speed');
  wind.innerHTML = `<span class="wind-icon"><i class="fas fa-wind"></i></span> Wind ${Math.round(weather.wind.speed)} mph  `;

  let wd = document.querySelector('.current .wind-dir');
  wd.innerHTML = degToCompass();

}


function dateBuilder (d) {
  let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

  let day = days[d.getDay()];
  let date = d.getDate();
  let month = months[d.getMonth()];
  let year = d.getFullYear();

  return `${day} ${date} ${month} ${year}`;
}

//function getCardinalDirection (angle) {
    //const directions = ['↑ N', '↗ NE', '→ E', '↘ SE', '↓ S', '↙ SW', '← W', '↖ NW'];
    //return directions[Math.round(weather.wind.deg / 45) % 8];
//}

//function degToCompass(num) {
    //var deg = displayResults();
    //var val = Math.floor((deg / 22.5) + 0.5);
    //var arr = ['↑ N', '↗ NE', '→ E', '↘ SE', '↓ S', '↙ SW', '← W', '↖ NW'];
    //return arr[(val % 8)];
    //console.log(deg);
//}
