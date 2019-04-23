<template>
  <div class="d-flex flex-column flex-md-row align-items-center p-3 px-md-4 mb-3 bg-white border-bottom shadow-sm">
    <h5 class="my-0 mr-md-auto font-weight-normal">Your Spotify</h5>
    <div class="my-0 mr-md-auto">
      <Search/>
    </div>
    <button class="btn btn-primary" type="button" @click="logout">Ir para Home</button>
  </div>
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
