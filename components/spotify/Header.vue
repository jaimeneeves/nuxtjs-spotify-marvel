<template>
  <!-- <div class="d-flex flex-column flex-md-row align-items-center p-3 px-md-4 mb-3 bg-white border-bottom shadow-sm">
    <h5 class="my-0 mr-md-auto font-weight-normal">Your Spotify</h5>
    <div class="my-0 mr-md-auto">
      <Search/>
    </div>
    <button class="btn btn-primary" type="button" @click="logout">Ir para Home</button>
  </div>-->

  <nav class="navbar navbar-expand-lg navbar-light p-3 px-md-4 mb-5 bg-success border-bottom shadow-lg">
    <a class="navbar-brand text-white" href="#">Spotify</a>
    <button class="navbar-toggler" type="button"
      data-toggle="collapse" data-target="#navbarSupportedContent"
      aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>

    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav mr-auto"></ul>
      <nuxt-link to="/" class="btn btn-light my-2 my-sm-0" name="index">Ir para Home</nuxt-link>
    </div>
  </nav>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import Search from '~/components/spotify/Search.vue'

export default {
  components: { Search },
  methods: {
    logout: function () {
      this.$store.dispatch('updateConnection', false)
      this.$router.push('/')
    }
  }
}
</script>
