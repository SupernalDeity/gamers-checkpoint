var i = 0;
var apiKey = 'a7e3e75b78414b8ab5d3b80de054658a';
var submitButton = document.querySelector('#searchGame');
var screenShotEl = document.querySelector('#screenshot');
var lastBtn = document.querySelector('#last');
var nextBtn = document.querySelector('#next');
var imgEl = document.querySelector('#imgEl');

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
    imgEl.src = data.results[0].short_screenshots[i].image;
    //imgEl.style.width = '100%';
    //imgEl.style.height = '100%';
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

