<template>
  <form class="form-inline">
    <input
      @focus="onFocus"
      @keyup="onKeyUp" class="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search">
    <button class="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
  </form>
</template>

<script>
  // import router from '@/router'
  import { mapActions } from 'vuex'

  export default {

    methods: {
      ...mapActions({
        search: 'search/search',
      }),

      onFocus(e) {
        const { name, params: { query }, } = this.$route;

        const { value } = e.target;

        if(value) {
          this.$router.push({name:'search-query', params: {query: value}})
        } else if (name !== 'search' && !query) {
          this.$router.push('/search')
        }
      },

      onKeyUp(e) {
        const { value, } = e.target;

        if (value !== '') {
          this.$router.replace({ name: "search-query", params: {query: value} });
          this.search(value);
        }
      }
    },
  }
</script>

<style lang="scss">

</style>