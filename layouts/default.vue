<template>
  <div :class="rootClass">
    <Header :isAuth="isAuth" v-if="isConnected" />
    <section class="container">
      <nuxt/>
    </section>
  </div>
</template>

<script>
import Header from '~/components/spotify/Header.vue'

export default {
  components: { Header },
  titleShort: 'is Listening',
  authorName: 'Jaime',
  computed: {
    isConnected() {
      return this.$store.state.isConnected
    },
    isAuth() {
      return this.$route.name === 'auth'
    },
    rootClass() {
      return this.isAuth ? 'auth base' : 'base'
    }
  },
  head() {
    return {
      title: `${this.$options.authorName} ${this.$options.titleShort} ·X· A Musical App`,
      link: [
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css?family=Bungee+Hairline|Oswald'
        }
      ]
    }
  }
}
</script>
