'use strict';

//link do wysyłania tweetów do tweetera
var tweetLink = "https://twitter.com/intent/tweet?text=";
//link do API z cytatami
var quoteUrl = "https://quotesondesign.com/wp-json/posts?filter[orderby]=rand&filter[posts_per_page]=1";

//funkcja pobierająca cytaty
function getQuote() {
    fetch(quoteUrl, { cache: "no-store" })//adres zapytania (link do api), wyłączamy możliwość zaglądani do HTTP Cache (aby każdorazwowo było wysyłane zapytanie)
        .then(function(resp) {
            return resp.json();
        })
        .then(createTweet);//funkcja tworząca tweet wykonywana po prawidłowym wykonaniu zapytania do API
}

//funkcja tworząca tweeta
function createTweet(input) {
    var data = input[0];

    var dataElement = document.createElement('div');
    dataElement.innerHTML = data.content;
    var quoteText = dataElement.innerText.trim();
    var quoteAuthor = data.title;

    if (!quoteAuthor.length) {
        quoteAuthor = "Unknown author";
    }
    var tweetText = "Quote of the day - " + quoteText + " Author: " + quoteAuthor;

    if (tweetText.length > 140) {
        getQuote();
    } else {
        var tweet = tweetLink + encodeURIComponent(tweetText);
        document.querySelector('.quote').innerText = quoteText;
        document.querySelector('.author').innerText = "Author: " + quoteAuthor;
        document.querySelector('.tweet').setAttribute('href', tweet);
    }
}

document.addEventListener('DOMContentLoaded', function() {
    getQuote();
    document.querySelector('.trigger').addEventListener('click', function() {
        getQuote();
    });
});