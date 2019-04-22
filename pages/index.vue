<template>
  <section>
    <div v-if="!isConnected">
      <nuxt-link to="/auth"
        class="btn btn-primary login-spotify"
        name="auth" aria-label="Login"
        :aria-current="!isAuth">
        Login Spotify
      </nuxt-link>
    </div>
  </section>
</template>

<script>
import NowPlaying from '~/components/NowPlaying.vue'
import Search from '~/components/spotify/Search.vue'

export default {
  components: { NowPlaying, Search },
  computed: {
    isAuth() {
      return this.$route.name === 'auth'
    },
    showTrack() {
      return this.isConnected && this.track
    },
    nowPlaying() {
      if (Boolean(Object.keys(this.$store.state.nowPlaying).length !== 0)) {
        this.$store.dispatch('updateConnection', true)
        return this.$store.state.nowPlaying
      }
      return this.$store.state.recentlyPlayed
    },
    track() {
      return this.nowPlaying
    },
    isPlaying() {
      return this.$store.state.isPlaying
    },
    isConnected() {
      return this.$store.state.isConnected
    }
  }
}
</script>

<style scoped>

</style>
