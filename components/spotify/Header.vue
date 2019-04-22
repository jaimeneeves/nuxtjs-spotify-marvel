<template>
  <div class="d-flex flex-column flex-md-row align-items-center p-3 px-md-4 mb-3 bg-white border-bottom shadow-sm">
    <h5 class="my-0 mr-md-auto font-weight-normal">Your Spotify</h5>
    <div class="my-0 mr-md-auto">
      <Search/>
    </div>
    <a class="btn btn-primary" href="#" @click="logout">Sair</a>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import Search from '~/components/spotify/Search.vue'

export default {
  props: ['isAuth'],
  components: { Search },
  methods: {
    logout: function () {
      this.$store.dispatch('updateConnection', false)
      this.$router.push('/select-server')
    }
  }
}
</script>

<style scoped>
h1 {
  line-height: 0.65em;
  font-family: 'Oswald', monospace;
  letter-spacing: 1px;
  font-size: 15em;
  transform: rotate(-3deg) translateY(-50%);
  -webkit-box-reflect: below 0px
    linear-gradient(transparent, rgba(255, 255, 255, 0.3));
}
h1 a {
  display: inline-block;
  height: 21px;
  width: 21px;
  background-image: url(~assets/spotify.svg);
  background-size: cover;
  filter: brightness(300%) opacity(30%);
  position: absolute;
  bottom: 0;
}
h1 a:hover {
  filter: brightness(300%) opacity(60%);
}
h1 a:after,
h1 a:before {
  content: none;
}
header {
  filter: blur(0);
  transition: all 600ms ease-out;
}
p {
  width: 40%;
  margin: auto;
  min-width: 320px;
}
</style>
