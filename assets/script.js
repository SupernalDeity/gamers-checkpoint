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
    var metacriticEl = document.createElement('p');
    var genreshEl = document.createElement('h4');
    var ratingScoreEl = document.createElement('p');
    var ratingshEl = document.createElement('h4');
    var esrbhEl = document.createElement('h4');
    // var ratingsEl = document.createElement('p');

    nameEl.className = "text-center"

    nameEl.textContent = data.results[0].name;
    esrbEl.textContent = "ESRB Rating: " + data.results[0].esrb_rating.name;
    // genresEl.textContent = data.results[0].name;
    metacriticEl.textContent = "Metacritic: " + data.results[0].metacritic;
    ratingScoreEl.textContent = "Rating: " + data.results[0].rating;
    genreshEl.textContent = 'Genres: ';
    ratingshEl.textContent = 'Ratings: ';
    esrbhEl.textContent = 'ESRB: ';
    // ratingsEl.textContent = data.results[0].name;

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

submitButton.addEventListener('click', getGameInfo);
lastBtn.addEventListener('click', prevImg);
nextBtn.addEventListener('click', nextImg);



function displayGiphy(data){
    for (var g = 0; g > 5; g++){
        var divEl = document.createElement('div');
        divEl.className = 'card col-12 col-md-2 m-4';
        divEl.style.width = '18rem';
        
        var imgEl = document.createElement('img');
        imgEl.className = 'card-img-top';
        imgEl.src = data.data[g].images.original.url;

        giphySection.appendChild(divEl);
        divEl.appendChild(imgEl);
    }
}

function getGameGiphy() {
    var url = `https://api.giphy.com/v1/gifs/search?q=${giphySearch}&api_key=${giphyApiKey}`;
    var giphySearch = 'Fortnite';

    fetch(url)
        .then(function (response) {
            return response.json();

        })
        
        .then(function (data) {
            console.log(data.data);
            displayGiphy(data);
        })


}
getGameGiphy();