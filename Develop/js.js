// var url = ;
var appid = "34f9c8c9a6f0d9f8a591a875acd250b6";
var stateCodes = [ 'AL', 'AK', 'AS', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'DC', 'FM', 'FL', 'GA', 'GU', 'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MH', 'MD', 'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ', 'NM', 'NY', 'NC', 'ND', 'MP', 'OH', 'OK', 'OR', 'PW', 'PA', 'PR', 'RI', 'SC', 'SD', 'TN', 'TX', 'UT', 'VT', 'VI', 'VA', 'WA', 'WV', 'WI', 'WY' ];
var searchCityButton = document.querySelector('.city-search-button');

initializeRecentSearches();


function initializeRecentSearches () {
    let recentSearches = JSON.parse(localStorage.getItem('Recent'));        
    if (!recentSearches) {
        let recentSearches = [
            {
            'recent-search-1':{'city':'some place','state': 'some state'},
            'recent-search-2':{'city':'','state': ''},
            'recent-search-3':{'city':'','state': ''},
            'recent-search-4':{'city':'','state': ''},
            'recent-search-5':{'city':'','state': ''},
            }
        ]
        localStorage.setItem('Recent Searches', JSON.stringify(recentSearches));
    } 
    
}
$('.recent-city').mouseover( function() {
    console.log( $(this).text());
})

document.getElementById('recent-city-ul').addEventListener("click", function(e) {
    let searchCity = (e.target.innerHTML)
    var childAttribute = (e.target.getAttribute('id'))
    let cityStateArray = strictFormat([searchCity]);
    let city = cityStateArray[0];
    let state = cityStateArray[1];
    weatherFetch(city,state,appid);
    let storedRecentSearches = JSON.parse(localStorage.getItem('Recent Searches'));
    console.log(storedRecentSearches);
    // console.log(recentSearches[0][`${childAttribute}`]) // = {'recentSearches':{'city':city, 'state':state}});
    
    storedRecentSearches.push({childAttribute:{'city':city, 'state':state}});
    console.log(storedRecentSearches);

    localStorage.setItem('Recent Searches', JSON.stringify(storedRecentSearches));
});

searchCityButton.addEventListener('click', function() {
    let searchCity = document.querySelector('#searchBar').value;
    let cityStateArray = strictFormat([searchCity]);
    let city = cityStateArray[0];
    let state = cityStateArray[1];
   weatherFetch(city,state,appid);
})

function weatherFetch(city, state,appid) {
    console.log(String(`api.openweathermap.org/data/2.5/weather?q=${city},${state}&appid=${appid}`));
    // fetch()
    //     .then(response => response.json())
    //     .then(data => console.log(data));
}

//need to create an independent function that operates with passed city/state/appid params
function strictFormat(arr) {
    // The user entry needs to be separated and formatted for fetch needs
   var newArr = arr[0].split(/(\s+)/);
   // remove any extra spaces that may be surrounding text
        // need to resolve city names with spaces between them
   newArr = newArr.filter(function(entry) { return entry.trim() != ''; });
   // remove any commas that user may have inadvertently typed
   var finalArr = [];
   for(let i = 0; i<newArr.length; i++){
       let items = newArr[i].replace(',','');
       finalArr.push(items);
   };
   //return the formatted array for use with fetch function
   return finalArr;
}

// Call current weather data for one location:
    //    api.openweathermap.org/data/2.5/weather?q={city name},{state code}&appid={API key}
        // Must have both cityName and State code as query strings
