
var apiKey = 'a7e3e75b78414b8ab5d3b80de054658a';
var submitButton = document.querySelector('#searchGame');
var screenShotEl = document.querySelector('#screenshot');


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
        displayScreenshot(data);
    })
};

function displayScreenshot(data) {
    var i = 0;
    var imgEl = document.createElement('img');
    imgEl.src = data[0].short_screenshots[i].image;
    screenShotEl.appendChild(imgEl);
};

submitButton.addEventListener('click', getGameInfo)