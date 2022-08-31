var i = 0;
var apiKey = 'a7e3e75b78414b8ab5d3b80de054658a';
var submitButton = document.querySelector('#searchGame');
var screenShotEl = document.querySelector('#screenshot');
var lastBtn = document.querySelector('#last');
var nextBtn = document.querySelector('#next');
var imgEl = document.querySelector('#imgEl');
var gameInfoBody = document.querySelector('#gameInfoBody')

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
    gameInfoBody.innerHTML = null;
    imgEl.src = data.results[0].short_screenshots[i].image;

    var nameEl = document.createElement('h1');
    var esrbEl = document.createElement('p');
    // var genresEl = document.createElement('p');
    var metacriticEl = document.createElement('p');
    var ratingScoreEl = document.createElement('p');
    // var ratingsEl = document.createElement('p');

    nameEl.className = "text-center"

    nameEl.textContent = data.results[0].name;
    esrbEl.textContent = "ESRB Rating: " + data.results[0].esrb_rating.name;
    // genresEl.textContent = data.results[0].name;
    metacriticEl.textContent = "Metacritic: " + data.results[0].metacritic;
    ratingScoreEl.textContent = "Rating: " + data.results[0].rating;
    // ratingsEl.textContent = data.results[0].name;

    gameInfoBody.appendChild(nameEl);
    gameInfoBody.appendChild(esrbEl);
    gameInfoBody.appendChild(metacriticEl);
    gameInfoBody.appendChild(ratingScoreEl);
    
};

function prevImg() {
    if (i == 0) {
        i == 6;
    }
    else {
        i--;
    }
    getGameInfo(event);
};

function nextImg() {
    if (i == 6) {
        i == 0;
    }
    else {
        i++;
    }
    getGameInfo(event);
};

submitButton.addEventListener('click', getGameInfo);
lastBtn.addEventListener('click', prevImg);
nextBtn.addEventListener('click', nextImg);

