var apiKey = 'a7e3e75b78414b8ab5d3b80de054658a';
var submitButton = document.querySelector('#searchGame');

function getGameInfo(event) {
    var gameName = document.querySelector('#gameName');
    var newURL = `https://api.rawg.io/api/games?key=${apiKey}&search=${gameName.value}`;

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