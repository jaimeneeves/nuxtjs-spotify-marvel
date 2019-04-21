const axios = require('axios')
const spotifyBaseUrl = 'https://api.spotify.com/v1/'

const User = {
  getUserData: function(access_token) {
    return axios.get(`${spotifyBaseUrl}me`, {
      headers: {
        withCredentials: true,
        Authorization: `Bearer ${access_token}`
      }
    })
  }
}

module.exports = User