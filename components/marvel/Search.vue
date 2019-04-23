<template>
  <div class="container">
    <div class="card">
      <div class="card-body">
        <div class="row justify-content-md-center">
          <div class="col-md-auto">
            <b-form-select v-model="selected" :options="options"></b-form-select>
          </div>
          <div class="col">
            <input
              @focus="onFocus"
              @keyup="onKeyUp" class="form-control mr-sm-2"
              type="search"
              placeholder="Pesquisar..." aria-label="Search">
          </div>
          <div class="col col-lg-2">
            <button type="button" class="btn btn-primary btn-block">Pesquisar</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  data() {
    return {
      selected: 'characters',
      options: [
          { value: 'characters', text: 'Personagens' },
          { value: 'comics', text: 'Histórias em Quadrinhos' }
      ]
    }
  },
  methods: {
    ...mapActions({
      search: 'search/search',
    }),

    onFocus(e) {
      const { name, params: { query }, } = this.$route;
      const { value } = e.target;

      if(value) {
        this.$router.push({name:'marvel-search-query', params: {query: value}})
      } else if (name !== 'search' && !query) {
        this.$router.push('/marvel/search')
      }
    },

    onKeyUp(e) {
      const { value, } = e.target;

      if (value !== '') {
        this.$router.replace({ name: "marvel-search-query", params: {query: value} });
        this.search(value);
      }
    }
  },
}
</script>
