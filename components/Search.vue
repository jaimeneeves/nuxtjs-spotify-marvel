<template>
  <div class="card">
    <div class="card-body">
      <form class="form-inline">
        <input
          @focus="onFocus"
          @keyup="onKeyUp" class="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search">
        <button class="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
      </form>
    </div>
  </div>
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
        const {
          name,
          params: { query },
        } = this.$route;

        const { value } = e.target;

        // if(value) {
        //   router.push({name:'search-result', params: {query: value}})
        // }else if (name !== 'search' && !query) {
        //   router.push('/search')
        // }
      },

      onKeyUp(e) {
        const {
          value,
        } = e.target;

        if (value !== '') {
          // this.$router.replace({ name: "search-result", params: {query: value} });
          this.search(value);
        }
      }
    },
  }
</script>

<style lang="scss">

</style>