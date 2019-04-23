const clientUrl = process.env.CLIENT_URL

export const state = () => ({
  query: '',
  result: '',
  isLoading: false,
  error: null,
  seriesOrComics: false,
})

export const mutations = {
  
  SET_SEARCH_QUERY(state, data) {
    state.query = data;
  },

  REQUEST_SEARCH(state) {
    state.isLoading = true;
  },

  REQUEST_SEARCH_SUCCESS(state, payload) {
    state.result = payload.data.results

    if(payload.type !== 'characters') {
      state.seriesOrComics = true
    } else {
      state.seriesOrComics = false
    }
  },

  REQUEST_SEARCH_ERROR(state, error) {
    state.isLoading = false;
    state.error = error;
  }
}

export const actions = {
  
  setSearchQuery({commit}, query) {
    commit('SET_SEARCH_QUERY', query)
  },

  requestSearch({commit}) {
    commit('REQUEST_SEARCH')
  },

  requestSearchSuccess({commit}, data) {
    commit('REQUEST_SEARCH_SUCCESS', data)
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
      dispatch('requestSearchSuccess', { data: response.data.data, type: params.type })
    } catch (e) {
      console.log(e)
      dispatch('requestSearchError', e);
    }
  }
}

export const getters = {}
