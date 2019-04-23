<template>
  <div class="container mt-3">
    <div v-if="!query">
      Encontre seus personagens e histórias em quandrinhos favoritas.
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
    ...mapState('marvel/search', [
      'query',
      'result',
      'isLoading',
      'error',
    ]),

    isLoadingData() {
      return this.isLoading;
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
