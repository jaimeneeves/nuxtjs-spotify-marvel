<template>
  <div>
    <Header v-if="isConnected" />
    <nuxt-child/>
  </div>
</template>

<script>
import Header from '~/components/spotify/Header.vue'

export default {
  components: { Header },
  computed: {
    isConnected() {
      return this.$store.state.isConnected
    }
  }
}
</script>
