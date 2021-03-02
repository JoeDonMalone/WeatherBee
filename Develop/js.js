// var url = ;
var currentId = "34f9c8c9a6f0d9f8a591a875acd250b6";
var forecastId = "3b717d16ab57a50678ca7fae8c164d47";
var uvId = "11f57e252bb7a083db68891139310d99";
var stateCodes = [ 'AL', 'AK', 'AS', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'DC', 'FM', 'FL', 'GA', 'GU', 'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MH', 'MD', 'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ', 'NM', 'NY', 'NC', 'ND', 'MP', 'OH', 'OK', 'OR', 'PW', 'PA', 'PR', 'RI', 'SC', 'SD', 'TN', 'TX', 'UT', 'VT', 'VI', 'VA', 'WA', 'WV', 'WI', 'WY' ];
var searchCityButton = document.querySelector('.city-search-button');
var todayDate = moment().format('ddd D');
// console.log(todayDate);

initializeRecentSearches();
assignRecentSearches();

function helloModal(){
    var myModalButton ='<button type="button" class="btn btn-primary hello-modal-button" data-bs-toggle="modal" data-bs-target="#helloModal"></button>';
    $("body").append(myModalButton);
    $('.btn').click();
    $('.hello-modal-button').remove();

}

function errorModal(){
    var errorModalButton ='<button type="button" class="btn btn-primary error-modal-button" data-bs-toggle="modal" data-bs-target="#errorModal"></button>';
    $("body").append(errorModalButton);
    $('.btn').click();
    $('.error-modal-button').remove();
}

function initializeRecentSearches () {
  let recentSearches = JSON.parse(localStorage.getItem('Recent Searches'));  
    if (!recentSearches) {
        let recentSearches = [];
        localStorage.setItem('Recent Searches', JSON.stringify(recentSearches));
        var storedRecentSearches = JSON.parse(localStorage.getItem('Recent Searches')); 
        for(let i = 0;i<5;i++){
        storedRecentSearches.push({'search':{'city':'None','state': 'None'}})
        localStorage.setItem('Recent Searches', JSON.stringify(storedRecentSearches));
        }
        helloModal();
    } else { 
        initializeLastSearch();
        

    }

}

function assignRecentSearches () {
    let recentSearches = JSON.parse(localStorage.getItem('Recent Searches'));
    $('.recent-city').each(function (i) {
    let li = (recentSearches.length-(i+1));
    let item = recentSearches[li]['search'];
    let city = item.city.toUpperCase();
    let state = item.state.toUpperCase();
    if(city === "NONE") {
        $(this).addClass('hidden');
    } else {
        $(this).text(`${city}, ${state}`);
        $(this).addClass('visible');
    }    
    })
}

function initializeLastSearch(){
    let searches = JSON.parse(localStorage.getItem('Recent Searches'));
    searchItem = searches.length-1;
    let item = searches[searchItem]['search'];
    let city = item.city.toUpperCase();
    let state = item.state.toUpperCase();
    let country = 'USA';
    currentWeatherFetch(city,state,country);
    forecastWeatherFetch(city,state,country);
}

$('.recent-city').mouseenter( function() {
    // $(this).css("border-bottom", "3px solid rgb(184,181, 181");
    $(this).css("border-bottom", "3px solid White");
}) 
$('.recent-city').mouseleave( function() {
    // $(this).css("border", "1px solid rgb(184,181, 181");
    $(this).css("border", "1px solid white");
})

//   Recent Search Functions
$(".recent-city").click(function(e) {
    let searchCity = $(this).text();
    console.log(searchCity)
    let cityStateArray = strictFormat([searchCity]);
    let city = cityStateArray[0].toLowerCase();
    let state = cityStateArray[1].toLowerCase();
    let country = 'USA';
    currentWeatherFetch(city,state,country);
    forecastWeatherFetch(city,state,country);
    let storedRecentSearches = JSON.parse(localStorage.getItem('Recent Searches'));    
    storedRecentSearches.push( {'search': {'city': city, 'state':state}});
    localStorage.setItem('Recent Searches', JSON.stringify(storedRecentSearches));
    assignRecentSearches();
});

// Active Search Functions
searchCityButton.addEventListener('click', function() {
    let searchString = document.querySelector('#searchBar').value;
    let cityStateArray = strictFormat([searchString]);
    let city = cityStateArray[0];
    let state = cityStateArray[1];
    let country = 'USA';
    currentWeatherFetch(city,state,country);
    forecastWeatherFetch(city,state,country);
    // retrieve the storedRecentSearches for pushing
    let storedSearches = JSON.parse(localStorage.getItem('Recent Searches'));
    storedSearches.push({'search': {"city":city , "state":state }})
    localStorage.setItem('Recent Searches', JSON.stringify(storedSearches));
    assignRecentSearches();
})

function currentWeatherFetch(city, state, country) {
    // url = `api.openweathermap.org/data/2.5/weather?q=,,&appid=`;
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${city},${state},${country}&units=imperial&appid=${currentId}`
    fetch(url)
        .then(response => response.json())
        // .then(data => localStorage.setItem('apiResponseCurrentObject', JSON.stringify(data)))
        .then(data => assignCurrentWeatherData(data))// => localStorage.setItem('apiResponseObject', JSON.stringify(data)))
            // .then(data => console.log(data[0]));// => localStorage.setItem('apiResponseObject', JSON.stringify(data)))
}

function forecastWeatherFetch(city, state, country) {
    let url = `https://api.openweathermap.org/data/2.5/forecast?q=${city},${state},${country}&cnt=56&units=imperial&appid=${forecastId}`
    fetch(url)
    .then((response) => {
        if (response.ok) {
            console.log(response)
            return response.json();
        } else {
            console.log(response)
            errorModal()
        }
    })
    .then((data) => assignFutureWeatherData(data));
}

function UVFetch(lat,lon) {
    // url = `api.openweathermap.org/data/2.5/weather?q=,,&appid=`;
    let url = `https://api.openweathermap.org/data/2.5/uvi?lat=${lat}&lon=${lon}&appid=${uvId}`
    fetch(url)
        .then(response => response.json())
        // .then(data => localStorage.setItem('UVIndexObject', JSON.stringify(data)));
        .then(data => assignUVData(data));// => localStorage.setItem('apiResponseObject', JSON.stringify(data)))
}

// CURRENT Weather Function//
function assignCurrentWeatherData(response) {
    let cityName = response.name;
    let humidity = response.main.humidity;
    let windSpeed = response.wind.speed;
    let temperature = response.main.temp;
    let imgIcon = response.weather[0].icon;
    let lat = [response.coord.lat];
    let lon = [response.coord.lon];
    UVFetch(lat,lon);

    $('.city-name').text(`${cityName} (${todayDate})`);
    $('.city-name').append(`<img src='https://openweathermap.org/img/wn/${imgIcon}@2x.png' class = 'current-img'>`);//
    $('.temperature').text(`${temperature} ${String.fromCharCode(176)}F`);
    $('.humidity').text(`Humidity: ${humidity}%`);
    $('.wind-speed').text(`Wind Speed: ${windSpeed} MPH`);
    // 
}

// UV Data Function 

function assignUVData(response) {
    let uvIndex = response.value;
    var bgColor;
    if(uvIndex >=0 && uvIndex <=2.99) {
        bgColor = '#279601';
    } else if(uvIndex >=3 && uvIndex<=5.99 ) {
        bgColor = '#f7e400';
    } else if(uvIndex >=6 && uvIndex<=7.99) {
        bgColor = '#f95902';
    } else if(uvIndex >=8 && uvIndex<=10.99) {
        bgColor = '#d90112';
    } else if(uvIndex>11) {bgColor = '#6c48cb';}
    $('#uv-index').text(`${uvIndex}`).css('background-color', bgColor);
}

// FUTURE WEATHER FORECAST //
function assignFutureWeatherData(response) {
    let dateItemIndex = 5;
    $('.card ').each( function (i) {
        if(i==0) {
            dateItemIndex = 5;
        } else{ dateItemIndex+=8
        }

        let date = moment().add(i+1, 'days').format('ddd D');
        let temperature = response.list[dateItemIndex].main.temp;
        let humidity = response.list[i].main.humidity;
        let imgIcon = response.list[dateItemIndex].weather[0].icon;

        $(this).find('.future-date').text(date);
        $(this).find('img').attr('src', `https://openweathermap.org/img/wn/${imgIcon}@2x.png`).css("visibility", "visible")
        $(this).find('.future-temperature').text(`${temperature} ${String.fromCharCode(176)}F`); 
        $(this).find('.future-humidity').text(`Humidity: ${humidity}%`); 
    })
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