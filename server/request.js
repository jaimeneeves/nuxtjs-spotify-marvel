const axios = require('axios')

const spotifyApi = axios.create({
  baseURL: 'https://api.spotify.com/v1/'
});

module.exports = { spotifyApi }