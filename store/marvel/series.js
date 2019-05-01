const clientUrl = process.env.CLIENT_URL

export const state = () => ({
  query: '',
  isLoading: false,
  error: null,
  series: ''
})

export const mutations = {
  
  START_LOADING(state) {
    state.isLoading = true;
  },

  SET_SEARCH_QUERY(state, data) {
    state.query = data;
    state.type = data.type;
  },

  REQUEST_SEARCH_ERROR(state, error) {
    state.isLoading = false;
    state.error = error;
  },

  REQUEST_SEARCH_SUCCESS(state, payload) {
    state.series = payload
    state.isLoading = false;
  },

  REQUEST_SERIES(state, payload) {
    state.series = payload
    state.isLoading = false;
  }

}

export const actions = {
  
  startLoading({commit}){
    commit('START_LOADING')
  },

  setSearchQuery({commit}, query) {
    commit('SET_SEARCH_QUERY', query)
  },

  requestSearch({commit}) {
    commit('REQUEST_SEARCH')
  },

  requestSeriesSearchSuccess({commit}, data) {
    commit('REQUEST_SEARCH_SUCCESS', data)
  },
  
  requestSearchError({commit}, error) {
    commit('REQUEST_SEARCH_ERROR', error)
  },

  requestSeries({commit}, data) {
    commit('REQUEST_SERIES', data)
  },

  async index ({dispatch}) {
    dispatch('startLoading')
    const response = await this.$axios.get(`${clientUrl}/api/marvel/series`, {})
    dispatch('requestSeries', response.data.data)
  }
}

export const getters = {}
