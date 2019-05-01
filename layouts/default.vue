<template>
  <div :class="rootClass">
    <nuxt/>
  </div>
</template>

<script>

export default {
  authorName: 'Jaime',
  computed: {
    isConnected() {
      return this.$store.state.isConnected
    },
    isAuth() {
      return this.$route.name === 'auth'
    },
    rootClass() {
      return this.isAuth ? 'auth base' : this.$route.name
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
