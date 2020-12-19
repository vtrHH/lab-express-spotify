require('dotenv').config();

const express = require('express');
const hbs = require('hbs');

// require spotify-web-api-node package here:
const SpotifyWebApi = require('spotify-web-api-node');

const app = express();

app.set('view engine', 'hbs');
app.set('views', __dirname + '/views');
app.use(express.static(__dirname + '/public'));

// setting the spotify-api goes here:
const spotifyApi = new SpotifyWebApi({
  clientId: process.env.CLIENT_ID,
  clientSecret: process.env.CLIENT_SECRET
});

// Retrieve an access token
spotifyApi
  .clientCredentialsGrant()
  .then((data) => spotifyApi.setAccessToken(data.body['access_token']))
  .catch((error) =>
    console.log('Something went wrong when retrieving an access token', error)
  );

// Our routes go here:
app.get('/', (request, response) => {
  response.render('home');
});

app.get('/artist-search', (request, response) => {
  spotifyApi
    .getArtists(['2hazSY4Ef3aB9ATXW7F5w3', '6J6yx1t3nwIDyPXk5xa7O8'])
    .then((data) => {
      const artists = data.body;
      console.log('Artists information', artists);
      response.render('artist-search-results', artists);
    })
    .catch((error) =>
      console.log('The error while searching artists occurred: ', error)
    );
});

app.listen(3000, () =>
  console.log('My Spotify project running on port 3000 🎧 🥁 🎸 🔊')
);
