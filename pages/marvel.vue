<template>
  <div>
    <Header/>
    <Search/>
    <nuxt-child/>
  </div>
</template>

<script>
import Header from '~/components/marvel/Header.vue'
import Search from '~/components/marvel/Search.vue'

export default {
  components: { Header, Search }
}
</script>
