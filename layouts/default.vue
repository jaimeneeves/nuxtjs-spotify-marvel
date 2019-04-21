<template>
  <div :class="rootClass">
    <Header :isAuth="isAuth"/>
    <section class="container">
      <nuxt/>
    </section>
    <!-- <Footer/> -->
    <!--<nuxt-link v-if="isAuth" class="area-close" aria-hidden="true" to="/" name="index"></nuxt-link>-->
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
    isAuth() {
      return this.$route.name === 'auth'
    },
    ariaCurrent() {
      return this.isAuth ? 'page' : false
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

