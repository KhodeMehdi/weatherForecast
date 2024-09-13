// debugger

var searchBtn = document.getElementById('searchBtn');
var searchInput = document.getElementById('searchInput');
var cityName ;

searchBtn.addEventListener('click' , getData) ;

// hiding the card before the user fill the input
function getData() {
    cityName = searchInput.value ;
    

    // i catch the data from https://www.visualcrossing.com
    const weatherApiUrl = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${cityName}?unitGroup=metric&include=days%2Chours%2Ccurrent&key=C9XS9UQG7W8F9EM3KYQ2BE9K8&contentType=json`;
    // i use two surces - its the second api and i just use this api fot weather condition icon (i dont like vscrossing icon)
    const secWeatherApiUrl = `https://api.openweathermap.org/data/2.5/weather?units=metric&q=${cityName}&appid=8b5f1f99394b10cc7dde66c0905fff81`
    const iconUrl = 'https://openweathermap.org/img/wn/'
    

    // get data from "vscrossing"
    async function getWeather() {
        const apiResponse = await fetch(weatherApiUrl);
        let weatherData = await apiResponse.json()
        console.log(weatherData);

        // get icon
        var iconStatus ;
        async function getIcon() {
            
            const apiResponse = await fetch(secWeatherApiUrl);
            let weatherData = await apiResponse.json()
            // console.log(weatherData);  
            iconStatus = weatherData.weather[0].icon
            document.getElementById('currentIcon').src = `${iconUrl}${iconStatus}@4x.png `

        }; getIcon() ;

        // updating data
        document.getElementById("currentTemp").innerHTML = Math.round(weatherData.currentConditions.temp) + "&deg;";
        document.getElementById('currentConditions').innerHTML = weatherData.days[0].conditions;
        document.getElementById('location').innerHTML = weatherData.resolvedAddress ;
        document.getElementById('feelslike').innerHTML = `${Math.round(weatherData.days[0].tempmax)} / ${Math.round(weatherData.days[0].tempmin)} , feels like ${Math.round(weatherData.currentConditions.feelslike)}`
        document.getElementById('humidity').innerHTML =  Math.round(weatherData.currentConditions.humidity) + "%" ;
        document.getElementById('wind').innerHTML = Math.round(weatherData.currentConditions.windspeed) + 'Km/h' ;
        document.getElementById('UV').innerHTML = weatherData.currentConditions.uvindex ;
        document.getElementById('visibility').innerHTML = weatherData.currentConditions.visibility + 'Km' ;
        document.getElementById('pressure').innerHTML = weatherData.currentConditions.pressure + 'mb' ;
        document.getElementById('dew').innerHTML = weatherData.currentConditions.dew + "&deg;"
        




        document.getElementById('mainMedia').style.display = "block"
        searchInput.value = ""


    }; getWeather();


}



    


