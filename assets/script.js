var apiKey = 'a7e3e75b78414b8ab5d3b80de054658a';
var gameName = document.querySelector('#gameName');
var submitButton = document.querySelector('#searchGame');

var newURL = `https://api.rawg.io/api/games?key=${apiKey}&search=${gameName.value}`;
function getGameInfo(event) {
    event.preventDefault();
    fetch(newURL)
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        console.log(data.results);
    })
    
}

submitButton.addEventListener('click', getGameInfo)