const searchField = document.getElementById("search");
const searchBtn = document.getElementById("searchButton");
let hourDisplay = document.getElementById("hours");
let dayDisplay = document.getElementById("days");
let locationDisplay = document.getElementById("location");
let temperatureDisplay = document.getElementById("tempval");
let conditionDisplay = document.getElementById("condition");
let lowDisplay = document.getElementById("lowVal");
let highDisplay = document.getElementById("highVal");
let humidityDisplay = document.getElementById("humidityVal");
let feelsLikeDisplay = document.getElementById("feelsLikeVal");
let precipitationDisplay = document.getElementById("precipitationVal");
let windSpeedDisplay = document.getElementById("windSpeedVal");
let sunsetDisplay = document.getElementById("sunsetVal");
let halfOfDay = document.getElementById("halfOfDay");
let randomQuoteDisplay = document.getElementById("randomQuoteVal");

//variables to be used
let place = undefined;
let weatherData = undefined;

//functions
function updateTime(time) {
  time = time.split(":"); // convert to array

  // fetch
  var hours = Number(time[0]);
  var minutes = Number(time[1]);

  // calculate
  var timeValue;

  if (hours > 0 && hours <= 12) {
    timeValue = "" + hours;
  } else if (hours > 12) {
    timeValue = "" + (hours - 12);
  } else if (hours == 0) {
    timeValue = "12";
  }

  timeValue += minutes < 10 ? ":0" + minutes : ":" + minutes;
  sunsetDisplay.textContent = timeValue;
  halfOfDay.textContent = hours >= 12 ? "PM" : "AM";
}

function updateDisplay(place, { currentConditions, days }) {
  //Main weather
  locationDisplay.textContent = place;
  temperatureDisplay.textContent = currentConditions.temp;
  conditionDisplay.textContent = currentConditions.conditions;
  lowDisplay.textContent = days[0].tempmin;
  highDisplay.textContent = days[0].tempmax;

  //Cards
  humidityDisplay.textContent = currentConditions.humidity;
  feelsLikeDisplay.textContent = currentConditions.feelslike;
  precipitationDisplay.textContent = currentConditions.precip
    ? currentConditions.precip
    : 0;
  updateTime(currentConditions.sunset);
  windSpeedDisplay.textContent = currentConditions.windspeed;
}

const getWeatherData = async (location) => {
  const rawData = await fetch(
    `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?unitGroup=us&include=hours%2Ccurrent%2Calerts&key=5NELP7DZ7YE7PFQCB6HZ5DPS8&contentType=json`,
    { mode: "cors" }
  );
  const { currentConditions, days } = await rawData.json();

  return { currentConditions, days };
};

const getQuoteData = async () => {
  try {
    const rawData = await fetch(`https://stoic.tekloon.net/stoic-quote`, {
      mode: "cors",
    });
    // const { author, quote} = await rawData.json();
    console.log(rawData);
  } catch (error) {
    console.log(error);
  }
};

//Event listeners
searchBtn.addEventListener("click", async () => {
  if (searchField.value !== "") {
    place =
      String(searchField.value).charAt(0).toUpperCase() +
      String(searchField.value).slice(1);
    weatherData = await getWeatherData(place);
    updateDisplay(place, weatherData);
  }
});

const setBackGroundGif = async () => {
  const rawData = await fetch(
    `https://api.giphy.com/v1/gifs/search?api_key=erLmsNWSybPhBdouBzmAiupverO6J3sy&q=rainfall&limit=25&offset=0&rating=g&lang=en&bundle=messaging_non_clips`,
    { mode: "cors" }
  );

  const { data } = await rawData.json();
  console.log(data[0].images.original.url);
};

//Keep beautifying the page, start adding data from API.
