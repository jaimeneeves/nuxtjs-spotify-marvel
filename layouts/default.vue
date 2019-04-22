<template>
  <div :class="rootClass">
    <Header :isAuth="isAuth" v-if="isConnected" />
    <section class="container">
      <nuxt/>
    </section>
  </div>
</template>

<script>
import Header from '~/components/Header.vue'
import Footer from '~/components/Footer.vue'

export default {
  components: { Header, Footer },
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

<style lang="scss">
</style>

