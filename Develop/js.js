// var url = ;
var appid = "34f9c8c9a6f0d9f8a591a875acd250b6";
var stateCodes = [ 'AL', 'AK', 'AS', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'DC', 'FM', 'FL', 'GA', 'GU', 'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MH', 'MD', 'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ', 'NM', 'NY', 'NC', 'ND', 'MP', 'OH', 'OK', 'OR', 'PW', 'PA', 'PR', 'RI', 'SC', 'SD', 'TN', 'TX', 'UT', 'VT', 'VI', 'VA', 'WA', 'WV', 'WI', 'WY' ];
var searchCityButton = document.querySelector('.city-search-button');

initializeRecentSearches();

var recentSearches = JSON.parse(localStorage.getItem('Recent Searches'));

function initializeRecentSearches () {
    if (!recentSearches) {
        let recentSearches = [
            {
            'recent-search-1':{'city':'','state': ''},
            'recent-search-2':{'city':'','state': ''},
            'recent-search-3':{'city':'','state': ''},
            'recent-search-4':{'city':'','state': ''},
            'recent-search-5':{'city':'','state': ''},
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

document.getElementById('recent-city-ul').addEventListener("click", function(e) {
    let searchCity = (e.target.innerHTML)
    var childAttribute = (e.target.getAttribute('id'))
    let cityStateArray = strictFormat([searchCity]);
    let city = cityStateArray[0];
    let state = cityStateArray[1];
    weatherFetch(city,state,appid);
    let storedRecentSearches = JSON.parse(localStorage.getItem('Recent Searches'));    
    storedRecentSearches.push( `{${childAttribute}: {'city':${city}, 'state':${state}}}`);
    console.log(storedRecentSearches);

    localStorage.setItem('Recent Searches', JSON.stringify(storedRecentSearches));
});

searchCityButton.addEventListener('click', function() {
    let searchString = document.querySelector('#searchBar').value;
    let cityStateArray = strictFormat([searchString]);
    let city = cityStateArray[0];
    console.log(city);
    let state = cityStateArray[1];
    console.log(state);
    let country = 'USA'
   weatherFetch(city,state,country,appid);
})

function convertToF(kelvin) {
    let celsius = kelvin-273.15;
    return (parseInt(celsius) * 9/5 + 32);
    }

var temp = JSON.parse(localStorage.getItem('apiResponseObject'));
// console.log(temp.main.temp)
let fTemp = convertToF(temp.main.temp);
console.log(fTemp)


function weatherFetch(city, state, country,appid) {
    // url = `api.openweathermap.org/data/2.5/weather?q=,,&appid=`;
    let url = `http://api.openweathermap.org/data/2.5/weather?q=${city},${state},${country}&appid=${appid}`
    fetch(url)
        .then(response => response.json())
        // .then(data => localStorage.setItem('apiResponseObject', JSON.stringify(data)))

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
