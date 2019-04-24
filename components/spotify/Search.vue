<template>
  <div class="container">
    <div class="card">
      <div class="card-body">
        <form>
          <input
            @focus="onFocus"
            @keyup="onKeyUp" class="form-control mr-sm-2"
            type="search"
            placeholder="Pesquisar..." aria-label="Search">
        </form>
       </div>
     </div>
  </div>
</template>

<script>
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
        this.$router.push({name:'spotify-search-query', params: {query: value}})
      } else if (name !== 'search' && !query) {
        this.$router.push('/spotify/search')
      }
    },

    onKeyUp(e) {
      const { value, } = e.target;

      if (value !== '') {
        this.$router.replace({ name: "spotify-search-query", params: {query: value} });
        this.search(value);
      }
    }
  },
}
</script>
