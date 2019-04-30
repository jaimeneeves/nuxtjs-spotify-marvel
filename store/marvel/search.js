const clientUrl = process.env.CLIENT_URL

export const state = () => ({
  query: '',
  result: '',
  isLoading: false,
  error: null,
  type: '',

  series: '',
  characters: '',
  comics: ''
})

export const mutations = {
  
  SET_SEARCH_QUERY(state, data) {
    state.query = data;
    state.type = data.type;
  },

  REQUEST_SEARCH(state) {
    state.isLoading = true;
  },

  REQUEST_SEARCH_ERROR(state, error) {
    state.isLoading = false;
    state.error = error;
  },

  /* SERIES */
  REQUEST_SERIES_SEARCH_SUCCESS(state, payload) {
    state.series = payload
    state.isLoading = false;
  },

  /* CHARACTERS */
  REQUEST_CHARACTERS_SEARCH_SUCCESS(state, payload) {
    state.characters = payload
    state.isLoading = false;
  },

  /* COMICS */
  REQUEST_COMICS_SEARCH_SUCCESS(state, payload) {
    state.comics = payload
    state.isLoading = false;
  },

}

export const actions = {
  
  setSearchQuery({commit}, query) {
    commit('SET_SEARCH_QUERY', query)
  },

  requestSearch({commit}) {
    commit('REQUEST_SEARCH')
  },

  requestSeriesSearchSuccess({commit}, data) {
    commit('REQUEST_SERIES_SEARCH_SUCCESS', data)
  },

  requestCharactersSearchSuccess({commit}, data) {
    commit('REQUEST_CHARACTERS_SEARCH_SUCCESS', data)
  },

  requestComicsSearchSuccess({commit}, data) {
    commit('REQUEST_COMICS_SEARCH_SUCCESS', data)
  },
  
  requestSearchError({commit}, error) {
    commit('REQUEST_SEARCH_ERROR', error)
  },

  async search({commit, dispatch}, params) {
    dispatch('requestSearch');
    dispatch('setSearchQuery', params);

    try {
      let args = {}
      
      if(params.type !== 'characters') {
        args = { params: {title: params.query} }
      } else {
        args = { params: {name: params.query} }
      }

      const response = await this.$axios.get(`${clientUrl}/api/marvel/${params.type}`, args)

      if (params.type === 'series') {
        dispatch('requestSeriesSearchSuccess', response.data.data)
      }

      if (params.type === 'characters') {
        dispatch('requestCharactersSearchSuccess', response.data.data)
      }

      if (params.type === 'comics') {
        dispatch('requestComicsSearchSuccess', response.data.data)
      }
      
    } catch (e) {
      console.log(e)
      dispatch('requestSearchError', e);
    }
  }
}

export const getters = {}
