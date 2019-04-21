const clientUrl = process.env.CLIENT_URL

export const state = () => ({
  query: '',
  result: '',
  isLoading: false,
  error: null,

  albums: '',
  albumsIsLoading: false,
  albumsError: null,

  artists: '',
  artistsIsLoading: false,
  artistsError: null,

  playlists: '',
  playlistsIsLoading: false,
  playlistsError: null,

  tracks: '',
  tracksIsLoading: false,
  tracksError: null,
})

export const mutations = {
  
  SET_SEARCH_QUERY(state, data) {
    state.query = data;
  },

  REQUEST_SEARCH(state) {
    state.isLoading = true;
  },

  REQUEST_SEARCH_SUCCESS(state, data) {
    state.result = data;
    state.albums = data.albums;
    state.artists = data.artists;
    state.playlists = data.playlists;
    state.tracks = data.tracks;
    state.isLoading = false;
  },

  REQUEST_SEARCH_ERROR(state, error) {
    state.isLoading = false;
    state.error = error;
  },

  /* ALBUMS */
  REQUEST_GET_ALBUMS(state) {
    state.albumsIsLoading = true;
  },

  REQUEST_GET_ALBUMS_SUCCESS(state, data) {
    state.albumsIsLoading = false;
    state.albums = {
      ...data.albums,
      items: [...state.albums.items, ...data.albums.items],
    };
  },

  REQUEST_GET_ALBUMS_ERROR(state, error) {
    state.albumsIsLoading = false;
    state.albumsError = error;
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

  async search({commit, dispatch}, query) {
    dispatch('requestSearch');
    dispatch('setSearchQuery', query);

    try {
      
      // Request Api
      // const response = await api.spotify.search.search(query);
      const response = await this.$axios.get(`${clientUrl}/api/search`, { params: {q: query} })
      console.log('response ', response.data)
      
      dispatch('requestSearchSuccess', response.data)
    } catch (e) {
      dispatch('requestSearchError', e);
    }
  },

  /* ALBUMS */
  requestGetAlbums({commit}) {
    commit('REQUEST_GET_ALBUMS')
  },

  requestGetAlbumsSuccess({commit}, data) {
    commit('REQUEST_GET_ALBUMS_SUCCESS', data)
  },

  requestGetAlbumsError({commit}, error) {
    commit('REQUEST_GET_ALBUMS_ERROR', error)
  },

  async getAlbums({commit, dispatch, state: { albums, query }}) {
    dispatch('requestGetAlbums');

    try {
      if (albums.next){
        const offset = albums.offset + albums.limit;
        
        // Request Api
        // const response = await api.spotify.search.search(query, 'album', offset); 
        const response = await this.$axios.get(`${clientUrl}/api/search`)

        dispatch('requestGetAlbumsSuccess', response.data);
      }
    } catch (e) {
      dispatch('requestGetAlbumsError', e);
    }
  }
}