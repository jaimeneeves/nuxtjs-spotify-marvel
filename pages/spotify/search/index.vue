<template>
  <div class="container">
    <div v-if="!query" class="search-view__info">
      Encontre suas músicas, artistas, albuns e playlists favoritas.
    </div>

    <nav-view v-if="query" :links="navLinks"/>

    <div v-if="isNoResultVisible" class="search-view__info">
      Nenhum registro para <strong>"{{query}}"</strong>
      <div>
        Por favor, certifique-se de que suas palavras estão escritas corretamente ou use menos palavras-chave diferentes.
      </div>
    </div>

    <!-- <loading-spinner v-if="isLoadingData"/> -->

    <div class="search-view__content">
      <router-view/>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'

import NavView from '~/components/NavView'
  // import LoadingSpinner from '@/components/LoadingSpinner'

export default {
  components: {
    NavView
    // LoadingSpinner,
  },

  computed: {
    ...mapState('search', [
      'query',
      'result',
      'isLoading',
      'error',
      'albumsIsLoading',
      'artistsIsLoading',
      'playlistsIsLoading',
      'tracksIsLoading',
    ]),

    isLoadingData() {
      return this.isLoading
        || this.tracksIsLoading
        || this.albumsIsLoading
        || this.artistsIsLoading
        || this.playlistsIsLoading;
    },

    isTracksExists() {
      return this.result && this.result.tracks && this.result.tracks.total > 0
    },

    isPlaylistsExists() {
      return this.result && this.result.playlists && this.result.playlists.total > 0
    },

    isAlbumsExists() {
      return this.result && this.result.albums && this.result.albums.total > 0
    },

    isArtistsExists() {
      return this.result && this.result.artists && this.result.artists.total > 0
    },

    isResult() {
      return this.isTracksExists || this.isAlbumsExists || this.isPlaylistsExists || this.isArtistsExists
    },

    isNoResultVisible() {
      return !this.isResult && this.query && !this.isLoading;
    },

    navLinks() {
      return [
        {
          to: {name: 'search-result', params: {query: this.query}},
          name: 'Top results',
        },
        {
          to: {name: 'search-track', params: {query: this.query}},
          name: 'Tracks',
          isVisible: this.isTracksExists,
        },
        {
          to: {name: 'search-playlist', params: {query: this.query}},
          name: 'Playlists',
          isVisible: this.isPlaylistsExists,
        },
        {
          to: {name: 'search-album', params: {query: this.query}},
          name: 'Albums',
          isVisible: this.isAlbumsExists,
        },
        {
          to: {name: 'search-artist', params: {query: this.query}},
          name: 'Artists',
          isVisible: this.isArtistsExists,
        },
      ]
    }
  },

  methods: {
    ...mapActions({
      notFoundPage: 'app/notFoundPage',
    }),
  },
}
</script>

<style scoped lang="scss">



</style>