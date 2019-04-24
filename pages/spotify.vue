<template>
  <div>
    <Header v-if="isConnected" />
    <Search/>
    <nuxt-child/>
  </div>
</template>

<script>
import Header from '~/components/spotify/Header.vue'
import Search from '~/components/spotify/Search.vue'

export default {
  components: { Header, Search },
  computed: {
    isConnected() {
      return this.$store.state.isConnected
    }
  }
}
</script>
