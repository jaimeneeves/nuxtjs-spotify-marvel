<template>
  <nav class="navbar navbar-expand-lg navbar-light p-3 px-md-4 mb-5 bg-danger border-bottom shadow-lg">
  <a class="navbar-brand text-white" href="#">Marvel</a>
  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
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

export default {
  components: {},
  methods: {
    logout: function () {
      // this.$store.dispatch('updateConnection', false)
      this.$router.push('/')
    }
  }
}
</script>
