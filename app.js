const apiKey = "5720db2892875eeeb9d819529855c6b1";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");



async function checkWeather(city) {
    const response = await fetch(apiUrl + city + `&appid=${apiKey}`)
    //Handeling error city name
    if (response.status === 404) {
        document.querySelector(".error").style.display = "block";
        document.querySelector(".weather").style.display = "none";

    } else {
        document.querySelector(".error").style.display = "none";
    }

    var data = await response.json();
    console.table(data);
    //Rendering page with results
    document.querySelector(".city").innerHTML = `${data.name}/${data.sys.country}`;
    console.log(data.sys.country);
    document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°c";
    document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
    document.querySelector(".wind").innerHTML = data.wind.speed + "km/h";
    let status = ["Clear", "Clouds", "Drizzle", "Mist", "Rain", "Snow"];

    //Changing weather icon
    for (i = 0; i < status.length; i++) {
        if (data.weather[0].main == status[i]) {
            console.log(data.weather[0].main);
            weatherIcon.src = `/images/${status[i].toLowerCase()}.png`;
        }
    }
    document.querySelector(".weather").style.display = "block";


}


searchBtn.addEventListener("click", () => {
    checkWeather(searchBox.value);
})