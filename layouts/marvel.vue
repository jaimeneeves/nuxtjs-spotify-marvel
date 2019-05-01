<template>
  <nuxt/>
</template>

<script>
export default {
  authorName: 'Jaime Neves',
  head() {
    return {
      title: `Marvel - ${this.$options.authorName}`,
      link: [
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css?family=Bungee+Hairline|Oswald'
        }
      ],
      bodyAttrs: {
        class: 'marvel'
      }
    }
  }
}
</script>
