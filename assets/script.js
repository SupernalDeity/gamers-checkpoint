var i = 0;
var apiKey = 'a7e3e75b78414b8ab5d3b80de054658a';
var giphyApiKey = '4mKQkGVuCgKzBUqK86l6OUFGSyLLVZ3K';
var submitButton = document.querySelector('#searchGame');
var screenShotEl = document.querySelector('#screenshot');
var lastBtn = document.querySelector('#last');
var nextBtn = document.querySelector('#next');
var imgEl = document.querySelector('#imgEl');
var gameInfoBody = document.querySelector('#gameInfoBody');
var giphySection = document.querySelector('#giphySection');
var buttonsEl = document.querySelector('#buttons');
var searchedGamesEl = document.querySelector('#searchedGames');

function getGameInfo(event) {
    event.preventDefault();
    var gameName = document.querySelector('#gameName');
    var gameUrl = `https://api.rawg.io/api/games?key=${apiKey}&search=${gameName.value}`;
    searchGameInfo(gameUrl);
};

function searchGameInfo (gameUrl){
    fetch(gameUrl)
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
    searchedGamesEl.innerHTML = null;

    var displayAllSearches = JSON.parse(localStorage.getItem('localGames')) || [];
    for (var v = 0; v < displayAllSearches.length; v++) {
        var btn = document.createElement('button');
        btn.className = 'btn btn-primary mx-2';
        btn.textContent = displayAllSearches[v];
        searchedGamesEl.appendChild(btn);
    };


    var nameEl = document.createElement('h1');
    var esrbEl = document.createElement('p');
    var metacriticEl = document.createElement('p');
    var genreshEl = document.createElement('h4');
    var ratingScoreEl = document.createElement('p');
    var ratingshEl = document.createElement('h4');
    var esrbhEl = document.createElement('h4');

    nameEl.className = "text-center";

    nameEl.textContent = data.results[0].name;
    esrbEl.textContent = "ESRB Rating: " + data.results[0].esrb_rating.name;
    metacriticEl.textContent = "Metacritic: " + data.results[0].metacritic;
    ratingScoreEl.textContent = "Rating: " + data.results[0].rating;
    genreshEl.textContent = 'Genres: ';
    ratingshEl.textContent = 'Ratings: ';
    esrbhEl.textContent = 'ESRB: ';
    lastBtn.textContent = 'Prev';
    nextBtn.textContent = 'Next';

    gameInfoBody.appendChild(nameEl);
    gameInfoBody.appendChild(esrbhEl);
    gameInfoBody.appendChild(esrbEl);
    gameInfoBody.appendChild(genreshEl);
    for (var y = 0; y < data.results[0].genres.length; y++) {
        var genresEl = document.createElement('p');
        genresEl.textContent = '' + data.results[0].genres[y].name;
        gameInfoBody.appendChild(genresEl);
    };
    gameInfoBody.appendChild(ratingshEl);
    gameInfoBody.appendChild(metacriticEl);
    gameInfoBody.appendChild(ratingScoreEl);
    for (var x = 0; x < data.results[0].ratings.length; x++) {
        var ratingsEl = document.createElement('p');
        ratingsEl.textContent = 'Rating: ' + data.results[0].ratings[x].title + ' -- Count: ' + data.results[0].ratings[x].count + ' -- ' + data.results[0].ratings[x].percent + '%';
        gameInfoBody.appendChild(ratingsEl);
    };

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

function displayGiphy(data) {
    giphySection.innerHTML = null;
    for (var g = 0; g < 5; g++) {
        var divGEl = document.createElement('div');
        var imgGEl = document.createElement('img');

        divGEl.className = 'card col-12 col-md-2 m-4 border-0';
        divGEl.style.width = '18rem';

        imgGEl.className = 'card-img-top';
        imgGEl.src = data.data[g].images.original.url;

        giphySection.appendChild(divGEl);
        divGEl.appendChild(imgGEl);
    };
};

function getGameGiphy(event) {
    event.preventDefault();
    var giphySearch = document.querySelector('#gameName');
    var url = `https://api.giphy.com/v1/gifs/search?q=${giphySearch.value}&api_key=${giphyApiKey}&rating=pg-13`;
    getGiphyInfo(url);
};

function getGiphyInfo (url) {
    fetch(url)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data.data);
            displayGiphy(data);
        })
};

function saveToLocal() {
    var game = document.querySelector('#gameName');
    var savedGames = JSON.parse(localStorage.getItem('localGames')) || [];
    savedGames.push(game.value);
    var data = JSON.stringify(savedGames);
    localStorage.setItem('localGames', data);
    getGameInfo(event);
    getGameGiphy(event);
};

function initialDisplayGame() {
    initialGameInfo()
    initialGameGiphy()
};

function initialGameInfo() {
    var gameName = "";
    var gameUrl = `https://api.rawg.io/api/games?key=${apiKey}&search=${gameName}`;
    searchGameInfo(gameUrl);
};

function initialGameGiphy() {
    var giphySearch = "GTA 5";
    var url = `https://api.giphy.com/v1/gifs/search?q=${giphySearch}&api_key=${giphyApiKey}&rating=pg-13`;
    getGiphyInfo(url);
};

function oldSearches(event) {
    event.preventDefault();
    if (event.target.matches('button')) {
        var oldGameSearch = event.target.textContent;
        var gameUrl = `https://api.rawg.io/api/games?key=${apiKey}&search=${oldGameSearch}`;
        searchGameInfo(gameUrl);
        var giphySearch = event.target.textContent;
        var url = `https://api.giphy.com/v1/gifs/search?q=${giphySearch}&api_key=${giphyApiKey}&rating=pg-13`;
        getGiphyInfo(url);
    };
};

submitButton.addEventListener('click', saveToLocal);
lastBtn.addEventListener('click', prevImg);
nextBtn.addEventListener('click', nextImg);
searchedGamesEl.addEventListener('click', oldSearches);

initialDisplayGame();