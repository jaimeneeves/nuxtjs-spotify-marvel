import axios from 'axios'

axios.defaults.baseURL = 'http://gateway.marvel.com'
axios.defaults.headers.common['apikey'] = 'd59624b47aeb36d27db95a194ed52b81eb3ce1d4'

export const mutations = {
    setCharacters (state, payload) {
      state.characters = payload
    }
}

export const actions = {
  async getCharacters (queryString) {
    return axios.get(`/v1/public/characters?limit=12&${queryString}`)
    .then(res => {
      return res.data
    })
  }
}