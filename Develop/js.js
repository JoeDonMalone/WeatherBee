var url = "https://api.openweathermap.org/data/2.5/forecast?id=524901&appid=";
var appid = "34f9c8c9a6f0d9f8a591a875acd250b6";

var searchCityButton = document.querySelector('.city-search-button');

searchCityButton.addEventListener('click', function() {
    var searchCity = document.querySelector('#searchBar').value;
    // console.log(url+appid)
    fetch(url+appid)
        .then(response => response.json())
        .then(data => console.log(data));
})
