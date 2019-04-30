<template>
  <div>
    <Header/>
    <h1 class="main-title mb-3">Marvel API</h1>
    <Search/>
    <nuxt-child/>
  </div>
</template>

<script>
import Header from '~/components/marvel/Header.vue'
import Search from '~/components/marvel/Search.vue'

export default {
  layout: 'marvel',
  components: { Header, Search }
}
</script>