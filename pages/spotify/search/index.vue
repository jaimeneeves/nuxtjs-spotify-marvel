<template>
  <div class="container mt-3">
    <div v-if="!query">
      Encontre suas músicas, artistas, albuns e playlists favoritas.
    </div>

    <div v-if="isNoResultVisible">
      Nenhum registro para <strong>"{{query}}"</strong>
      <p> Por favor, certifique-se de que suas palavras estão escritas corretamente ou use menos palavras-chave diferentes. </p>
    </div>

    <loading-spinner v-if="isLoadingData"/>

    <div class="search-view__content">
      <router-view/>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import LoadingSpinner from '~/components/LoadingSpinner'

export default {
  components: {
    LoadingSpinner
  },

  computed: {
    ...mapState('spotify/search', [
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
    }
  },

  methods: {
    ...mapActions({
      notFoundPage: 'app/notFoundPage',
    }),
  },
}
</script>
