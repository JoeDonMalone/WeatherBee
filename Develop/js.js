// var url = ;
var appid = "34f9c8c9a6f0d9f8a591a875acd250b6";
var stateCodes = [ 'AL', 'AK', 'AS', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'DC', 'FM', 'FL', 'GA', 'GU', 'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MH', 'MD', 'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ', 'NM', 'NY', 'NC', 'ND', 'MP', 'OH', 'OK', 'OR', 'PW', 'PA', 'PR', 'RI', 'SC', 'SD', 'TN', 'TX', 'UT', 'VT', 'VI', 'VA', 'WA', 'WV', 'WI', 'WY' ];
var searchCityButton = document.querySelector('.city-search-button');
var todayDate = moment().format('M/D/YYYY');
// console.log(todayDate);



initializeRecentSearches();



function initializeRecentSearches () {
  let recentSearches = JSON.parse(localStorage.getItem('Recent Searches'));  
    if (!recentSearches) {
        let recentSearches = [
            {
            'search':{'city':'','state': ''},
            'search':{'city':'','state': ''},
            'search':{'city':'','state': ''},
            'search':{'city':'','state': ''},
            'search':{'city':'','state': ''},
            }
        ]
        localStorage.setItem('Recent Searches', JSON.stringify(recentSearches));
    } 
    
}

$('.recent-city').mouseenter( function() {
    $(this).css("border-bottom", "3px solid rgb(184,181, 181");
}) 
$('.recent-city').mouseleave( function() {
    $(this).css("border", "1px solid rgb(184,181, 181");
})


//   Recent Search Functions
document.getElementById('recent-city-ul').addEventListener("click", function(e) {
    let searchCity = (e.target.innerHTML)
    // var childAttribute = (e.target.getAttribute('id'))
    let cityStateArray = strictFormat([searchCity]);
    let city = cityStateArray[0];
    let state = cityStateArray[1];
    currentWeatherFetch(city,state,appid);
    let storedRecentSearches = JSON.parse(localStorage.getItem('Recent Searches'));    
    storedRecentSearches.push( {'search': {'city': city, 'state':state}});
    localStorage.setItem('Recent Searches', JSON.stringify(storedRecentSearches));
});
// let storedRecentSearches = JSON.parse(localStorage.getItem('Recent Searches'));


// Active Search Functions
searchCityButton.addEventListener('click', function() {
    let searchString = document.querySelector('#searchBar').value;
    let cityStateArray = strictFormat([searchString]);
    let city = cityStateArray[0];
    let state = cityStateArray[1];
    let country = 'USA';
    currentWeatherFetch(city,state,country,appid);
    forecastWeatherFetch(city,state,country,appid);
    // retrieve the storedRecentSearches for pushing
    let storedSearches = JSON.parse(localStorage.getItem('Recent Searches'));
    storedSearches.push({'search': {"city":city , "state":state }})
    localStorage.setItem('Recent Searches', JSON.stringify(storedSearches));
})


function currentWeatherFetch(city, state, country,appid) {
    // url = `api.openweathermap.org/data/2.5/weather?q=,,&appid=`;
    let url = `http://api.openweathermap.org/data/2.5/weather?q=${city},${state},${country}&units=imperial&appid=${appid}`
    fetch(url)
        .then(response => response.json())
        // .then(data => localStorage.setItem('apiResponseCurrentObject', JSON.stringify(data)))
        .then(data => assignCurrentWeatherVariable(data));// => localStorage.setItem('apiResponseObject', JSON.stringify(data)))
}

function forecastWeatherFetch(city, state, country,appid) {
    // url = `api.openweathermap.org/data/2.5/weather?q=,,&appid=`;
    let url = `http://api.openweathermap.org/data/2.5/forecast?q=${city},${state},${country}&cnt=48&units=imperial&appid=${appid}`
    fetch(url)
        .then(response => response.json())
        // .then(data => localStorage.setItem('apiResponseFutureObject', JSON.stringify(data)))
        .then(data => assignFutureWeatherVariable(data));// => localStorage.setItem('apiResponseObject', JSON.stringify(data)))
}


// Decoded Items from API Response

// function convertToF(kelvin) {
//     let celsius = kelvin-273.15;
//     // let response = JSON.parse(localStorage.getItem('apiResponseObject'));
//     return(parseInt(celsius) * 9/5 + 32)
// }

// CURRENT Weather Function//
function assignCurrentWeatherVariable(response) {
    // let response = response;
    let cityName = response.name;
    let humidity = response.main.humidity;
    console.log(humidity);
    let windSpeed = response.wind.speed;
    console.log(windSpeed);
    // let temperature = convertToF(response.main.temp);
    let temperature = response.main.temp;
    console.log(temperature);
    // let uvIndex= ;
    // let secondsInDay = 86400;
    let dayOne = response.dt; 
    console.log(dayOne);
    // let dayTwo = dayOne - (86400); 
    // let dayThree = dayOne - (86400 * 2);
    // let dayFour = dayOne - (86400 * 3);
    // let dayFive = dayOne - (86400 * 4);
    $('.city-name').text(`${cityName} (${todayDate})`);
    $('.temperature').text(`Temperature: ${temperature}${String.fromCharCode(176)}F`);
    $('.humidity').text(`Humidity: ${humidity}%`);
    $('.wind-speed').text(`Wind Speed: ${windSpeed} MPH`);
    // $('.uv-index').text(`UV Index: ${cityName}`);
}

// FUTURE WEATHER FORECAST //
function assignFutureWeatherVariable(response) {
    // let response = response;
    let cityName = response.name;
    let humidity = response.main.humidity;
    console.log(humidity);
    let windSpeed = response.wind.speed;
    console.log(windSpeed);
    // let temperature = convertToF(response.main.temp);
    let temperature = response.main.temp;
    console.log(temperature);
    // let uvIndex= ;
    // let secondsInDay = 86400;
    let dayOne = response.dt; 
    console.log(dayOne);
    // let dayTwo = dayOne - (86400); 
    // let dayThree = dayOne - (86400 * 2);
    // let dayFour = dayOne - (86400 * 3);
    // let dayFive = dayOne - (86400 * 4);
    $('.city-name').text(`${cityName} (${todayDate})`);
    $('.temperature').text(`Temperature: ${temperature}${String.fromCharCode(176)}F`);
    $('.humidity').text(`Humidity: ${humidity}%`);
    $('.wind-speed').text(`Wind Speed: ${windSpeed} MPH`);
    // $('.uv-index').text(`UV Index: ${cityName}`);
}

//need to create an independent function that operates with passed city/state/appid params
function strictFormat(arr) {
    // The user entry needs to be separated and formatted for fetch needs
   var newArr = arr[0].split(/(\s+)/);
   // remove any extra spaces that may be surrounding text
   newArr = newArr.filter(function(entry) {return entry.trim() != ''; });
   // remove any commas that user may have inadvertently typed
   var strippedArr = [];
   for(let i = 0; i<newArr.length; i++){
       let items = newArr[i].replace(',','');
       strippedArr.push(items);
   };
   // Resolve city names with spaces between them & return the formatted array for use with 'fetch' function
   var finalArr = [];
    for(let i = 0;i<strippedArr.length-1;i++){
        if(i==0){
            finalArr.push(strippedArr[0]);
        } else {
            let tempItem = finalArr[0]+strippedArr[i];
            finalArr = [tempItem];
        }
    }
    finalArr.push(strippedArr[(strippedArr.length-1)]);
    return finalArr;
}



// Call current weather data for one location:
    //    api.openweathermap.org/data/2.5/weather?q={city name},{state code}&appid={API key}
        // Must have both cityName and State code as query strings
//Call for UV Index 
       // http://api.openweathermap.org/data/2.5/uvi/forecast?lat={lat}&lon={lon}&cnt={cnt}&appid={API key}
//Call for xxx day forecast, depenedant on # of days selected
    // api.openweathermap.org/data/2.5/forecast/daily?q={city name},{state code},{country code}&cnt=5&appid={API key}