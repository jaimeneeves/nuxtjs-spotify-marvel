<template>
  <div class="container">
    <div class="card">
      <div class="card-body">
        <div class="row justify-content-md-center">
          <div class="col">
            <input
              @focus="onFocus"
              @keyup.enter="onSearch" class="form-control mr-sm-2"
              type="search"
              v-model="searchValue"
              placeholder="Pesquisar..." aria-label="Search">
          </div>
          <div class="col col-lg-2">
            <button type="button" @focus="onFocus" @click="onSearch" class="btn btn-primary btn-block">Pesquisar</button>
          </div>
        </div>
        <div class="row">
          <div class="col mt-3">        
            <b-form-group>
              <b-form-radio-group
                id="radio-group-1"
                v-model="selected"
                :options="options"
                name="radio-options">
              </b-form-radio-group>
            </b-form-group>
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
      searchValue: '',
      selected: 'series',
      options: [
        { value: 'series', html: '<span class="badge badge-pill badge-secondary">Séries</span>' },
        { value: 'characters', html: '<span class="badge badge-pill badge-primary">Personagens</span>' },
        { value: 'comics', html: '<span class="badge badge-pill badge-success">Histórias em Quadrinhos</span>' }
      ]
    }
  },
  methods: {
    ...mapActions({
      search: 'marvel/search/search',
    }),

    onFocus(e) {
      const { name, params: { query }, } = this.$route;
      const { value } = e.target;

      if(value) {
        this.$router.push({ name:'marvel-search-result', params: {query: value}})
      } else if (name !== 'search' && !query) {
        this.$router.push('/marvel/search')
      }
    },

    onSearch(e) {
      const value = this.searchValue;
      const params = {
        query: value,
        type: this.selected
      }

      if (value !== '') {
        this.$router.replace({ name: 'marvel-search-result', params: {query: value} });

        // To store method
        this.search(params);
      }
    }
  },
}
</script>
