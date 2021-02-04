// var url = ;
var appid = "34f9c8c9a6f0d9f8a591a875acd250b6";
var stateCodes = [ 'AL', 'AK', 'AS', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'DC', 'FM', 'FL', 'GA', 'GU', 'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MH', 'MD', 'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ', 'NM', 'NY', 'NC', 'ND', 'MP', 'OH', 'OK', 'OR', 'PW', 'PA', 'PR', 'RI', 'SC', 'SD', 'TN', 'TX', 'UT', 'VT', 'VI', 'VA', 'WA', 'WV', 'WI', 'WY' ];

var searchCityButton = document.querySelector('.city-search-button');


searchCityButton.addEventListener('click', function() {
    var searchCity = document.querySelector('#searchBar').value;
    let cityStateArray = strictFormat([searchCity]);
    let city = cityStateArray[0];
    let state = cityStateArray[1];
   weatherFetch(city,state,appid);
})

function weatherFetch(city, state,appid) {
    // console.log(city, state)
    // console.log(`api.openweathermap.org/data/2.5/weather?q=${city},${state}&appid=${appid}`)
    //Testing link intentionally mispelled
    console.log(String(`api.openweathermap.org/data/2.5/weather?q=${city},${state}&appid=${appid}`));
    // fetch()
    //     .then(response => response.json())
    //     .then(data => console.log(data));
}







//need to create an independent function that operates with a passed city name param
function strictFormat(arr) {
    // The user entry needs to be separated and formatted for fetch needs
   var newArr =arr[0].split(/(\s+)/);
   // remove any extra spaces that may be surrounding text
   newArr = newArr.filter(function(entry) { return entry.trim() != ''; });
   // remove any commas that user may have inadvertently typed
   var finalArr = [];
   for(var i = 0; i<newArr.length; i++){
       var items = newArr[i].replace(',','');
       finalArr.push(items);
   }
   //return the formatted array for use with fetch function
   return finalArr;
}





// Call current weather data for one location:
    //    api.openweathermap.org/data/2.5/weather?q={city name},{state code}&appid={API key}
        // Must have both cityName and State code as query strings
