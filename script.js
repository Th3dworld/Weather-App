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
let halfOfDaySet = document.getElementById("halfOfDaySet");
let halfOfDayRise = document.getElementById("halfOfDayRise");
let sunRiseDisplay = document.getElementById("sunriseVal");

//variables to be used
let place = undefined;
let weatherData = undefined;
let currTimeData = undefined;
let sunrise = undefined;
let sunset = undefined;

function returnIconUrl(condition, timeValue, timeOfDay) {
  let sunRiseTime = sunrise.timeValue.split(":")[0];
  let sunSetTime = sunset.timeValue.split(":")[0];
  console.log(sunRiseTime);

  if (timeOfDay == "AM" && timeValue == sunRiseTime) {
    return "./assets/sunrise.svg";
  } else if (timeOfDay == "PM" && timeValue == sunSetTime) {
    return "./assets/sunset.svg";
  } else if (
    (timeOfDay == "AM" && timeValue > sunRiseTime && timeValue != 12) ||
    (timeOfDay == "PM" && timeValue < sunSetTime) ||
    (timeOfDay == "PM" && timeValue == 12 && sunSetTime < 12)
  ) {
    switch (condition) {
      case "Partially cloudy":
        return "./assets/partiallyCloudyDay.svg";
      case "Clear":
        return "./assets/sun.svg";
      case "Rain, Partially cloudy":
        return "./assets/rainPartiallyCloudyDay.svg";
      case "Overcast":
        return "./assets/overcastDay.svg";
      case "Rain, Overcast":
        return "./assets/rainyDay.svg";
      case "Snow, Rain, Partially cloudy":
        return "./assets/snowDay.svg";
      case "Snow, Overcast":
        return "./assets/snowDay.svg";
      case "Snow, Rain, Overcast":
        return "./assets/snowDay.svg";
    }
  } else if (
    (timeOfDay == "AM" && timeValue < sunRiseTime) ||
    (timeOfDay == "PM" && timeValue > sunSetTime) ||
    (timeOfDay == "AM" && timeValue == 12 && sunRiseTime < 12)
  ) {
    switch (condition) {
      case "Partially cloudy":
        return "./assets/partiallyCloudyNight.svg";
      case "Clear":
        return "./assets/moon.svg";
      case "Rain, Partially cloudy":
        return "./assets/partiallyCloudyRainNight.svg";
      case "Overcast":
        return "./assets/overcastNight.svg";
      case "Rain, Overcast":
        return "./assets/partiallyCloudyRainNight.svg";
      case "Snow, Rain, Partially cloudy":
        return "./assets/snowNight.svg";
      case "Snow, Overcast":
        return "./assets/snowNight.svg";
      case "Snow, Rain, Overcast":
        return "./assets/snowNight.svg";
    }
  } else if (timeOfDay == "AM") {
    switch (condition) {
      case "Partially cloudy":
        return "./assets/partiallyCloudyDay.svg";
      case "Clear":
        return "./assets/sun.svg";
      case "Rain, Partially cloudy":
        return "./assets/rainPartiallyCloudyDay.svg";
      case "Overcast":
        return "./assets/overcastDay.svg";
      case "Rain, Overcast":
        return "./assets/rainyDay.svg";
      case "Snow, Rain, Partially cloudy":
        return "./assets/snowDay.svg";
      case "Snow, Overcast":
        return "./assets/snowDay.svg";
      case "Snow, Rain, Overcast":
        return "./assets/snowDay.svg";
    }
  }
}

/*
Posible conditions
 */

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
  let timeOfDay = hours >= 12 ? "PM" : "AM";
  return { timeValue, timeOfDay };
}

function getCurrtimeFormatted({ datetime }) {
  datetime = datetime.split(":"); // convert to array

  // fetch
  var hours = Number(datetime[0]);

  // calculate
  var timeValue;
  var timeOfDay;

  if (hours > 0 && hours <= 12) {
    timeValue = "" + hours;
  } else if (hours > 12) {
    timeValue = "" + (hours - 12);
  } else if (hours == 0) {
    timeValue = "12";
  }

  timeOfDay = hours >= 12 ? "PM" : "AM";
  timeValue = Number(timeValue);

  return { timeValue, timeOfDay };
}

function updateHourlyDisplay({ currentConditions, days }) {
  let currTime = getCurrtimeFormatted(currentConditions);

  function hourHelper({ datetime, conditions, temp }) {
    datetime = datetime.split(":"); // convert to array

    // fetch
    var hours = Number(datetime[0]);

    // calculate
    var timeValue;
    var timeOfDay;

    if (hours > 0 && hours <= 12) {
      timeValue = "" + hours;
    } else if (hours > 12) {
      timeValue = "" + (hours - 12);
    } else if (hours == 0) {
      timeValue = "12";
    }

    timeOfDay = hours >= 12 ? "PM" : "AM";
    timeValue = Number(timeValue);
    return { timeValue, timeOfDay, conditions, temp };
  }

  function getValidHours(todaysHour) {
    console.log(currTime.timeValue);
    if (currTime.timeOfDay == "AM" && currTime.timeValue == 12) {
      return true;
    } else if (currTime.timeOfDay == "AM") {
      return (
        (todaysHour.timeValue >= currTime.timeValue &&
          todaysHour.timeValue != 12) ||
        todaysHour.timeOfDay != currTime.timeOfDay
      );
    } else {
      return (
        todaysHour.timeValue >= currTime.timeValue &&
        todaysHour.timeOfDay == currTime.timeOfDay &&
        todaysHour.timeValue != 12
      );
    }
  }

  function getAMHours(todaysHour) {
    return todaysHour.timeOfDay == "AM";
  }

  function getPMHours(todaysHour) {
    return todaysHour.timeOfDay == "PM";
  }

  function sorthelp(a, b) {
    if (a.timeValue < b.timeValue) {
      return -1;
    }
    if (a.timeValue > b.timeValue) {
      return 1;
    }
    return 0;
  }

  //today's hours
  let todaysHours = days[0].hours
    .map((hour) => hourHelper(hour))
    .filter((hour) => getValidHours(hour))
    .sort(sorthelp);

  let todayAM = todaysHours.filter(getAMHours);
  let todayPM = todaysHours.filter(getPMHours);
  todayAM = todayAM.sort(sorthelp);
  todayPM = todayPM.sort(sorthelp);
  console.log(todayAM);
  console.log(todayPM);

  //get 12PM to front:
  if (todayPM.length == 12) {
    let temp = todayPM[11];
    todayPM = todayPM.slice(0, 11);
    todayPM.unshift(temp);
  }

  if (todayAM.length == 12) {
    let temp = todayAM[11];
    todayAM = todayAM.slice(0, 11);
    todayAM.unshift(temp);
  }
  //get sorted hours
  todaysHours = todayAM.concat(todayPM);

  //tomorrows hours
  let tomorrowsHours = days[1].hours.map((hour) => hourHelper(hour));
  let totalHoursDisplayed = 0;
  console.log(currentConditions.conditions);
  console.log(returnIconUrl(currentConditions.conditions, "AM"));
  todaysHours.forEach((hour) => {
    if (totalHoursDisplayed == 0) {
      hourDisplay.innerHTML = `
        <div class="hour">
            <div class="time">Now</div>
            <div
                class="icon"
                style="
                    background-image: url(${returnIconUrl(
                      currentConditions.conditions,
                      currTime.timeValue,
                      currTime.timeOfDay
                    )});
                "
            ></div>
            <div class="temp">${hour.temp}°</div>
        </div>
        `;
    } else {
      hourDisplay.innerHTML += `
        <div class="hour">
            <div class="time">${hour.timeValue}
                <span class="TOD">${hour.timeOfDay}</span>
            </div>
            <div
                class="icon"
                style="
                    background-image: url(${returnIconUrl(
                      currentConditions.conditions,
                      hour.timeValue,
                      hour.timeOfDay
                    )});
                "
            ></div>
            <div class="temp">${hour.temp}°</div>
        </div>
        `;
    }
    totalHoursDisplayed += 1;
  });

  for (i = 0; totalHoursDisplayed < 25; totalHoursDisplayed++, i++) {
    let hour = tomorrowsHours[i];
    hourDisplay.innerHTML += `
          <div class="hour">
              <div class="time">${hour.timeValue}
                  <span class="TOD">${hour.timeOfDay}</span>
              </div>
              <div
                  class="icon"
                  style="
                  background-image: url(${returnIconUrl(
                    currentConditions.conditions,
                    hour.timeValue,
                    hour.timeOfDay
                  )});
                  "
              ></div>
              <div class="temp">${hour.temp}°</div>
          </div>
          `;
  }
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

  //Get sunrise and sunset Data
  sunset = updateTime(currentConditions.sunset);
  sunrise = updateTime(currentConditions.sunrise);

  //update sunrise and sunsetDisplay
  sunRiseDisplay.textContent = sunrise.timeValue;
  halfOfDayRise = sunrise.timeOfDay;
  sunsetDisplay.textContent = sunset.timeValue;
  halfOfDaySet = sunset.timeOfDay;

  windSpeedDisplay.textContent = currentConditions.windspeed;

  updateHourlyDisplay({ days, currentConditions });
  console.log(days);
}

const getWeatherData = async (location) => {
  const rawData = await fetch(
    `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?unitGroup=us&include=hours%2Ccurrent%2Calerts&key=5NELP7DZ7YE7PFQCB6HZ5DPS8&contentType=json`,
    { mode: "cors" }
  );
  const { currentConditions, days } = await rawData.json();
  return { currentConditions, days };
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

// const setBackGroundGif = async () => {
//   const rawData = await fetch(
//     `https://api.giphy.com/v1/gifs/search?api_key=erLmsNWSybPhBdouBzmAiupverO6J3sy&q=rainfall&limit=25&offset=0&rating=g&lang=en&bundle=messaging_non_clips`,
//     { mode: "cors" }
//   );

//   const { data } = await rawData.json();
//   console.log(data[0].images.original.url);
// };

//TODO
//GET SUNRISE AND SUNSET
//SPLIT ARRAY INTO AM AND PM THEN SORT AND JOIN IN ORDER TO AVOID COMPLICATION
