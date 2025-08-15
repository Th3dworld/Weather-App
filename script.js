const getWeatherData = async (location) => {
  const rawData = await fetch(
    `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?unitGroup=us&include=hours%2Ccurrent%2Calerts&key=5NELP7DZ7YE7PFQCB6HZ5DPS8&contentType=json`,
    { mode: "cors" }
  );
  const { currentConditions, days } = await rawData.json();

  return { currentConditions, days };
};

const setBackGroundGif = async () => {
  const rawData = await fetch(
    `https://api.giphy.com/v1/gifs/search?api_key=erLmsNWSybPhBdouBzmAiupverO6J3sy&q=rainfall&limit=25&offset=0&rating=g&lang=en&bundle=messaging_non_clips`,
    { mode: "cors" }
  );

  const { data } = await rawData.json();
  console.log(data[0].images.original.url);
};

setBackGroundGif();
const { currentConditions, days } = getWeatherData("lusaka");
