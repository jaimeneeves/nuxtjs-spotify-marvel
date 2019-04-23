import axios from 'axios'

axios.defaults.baseURL = 'http://gateway.marvel.com'
axios.defaults.headers.common['apikey'] = 'd59624b47aeb36d27db95a194ed52b81eb3ce1d4'

export const mutations = {
    setCharacters (state, payload) {
      state.characters = payload
    }
}

export const actions = {
  getCharacters ({ commit }, name) {
    return axios.get(`/v1/public/characters?limit=12&name=${name}`)
    .then(res => {
      commit('setCharacters', res.data)
    })
  }
}