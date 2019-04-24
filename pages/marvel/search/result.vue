<template>
  <div class="container mt-5 mb-5">
  
    <loading-spinner  v-if="isLoadingData"/>

    <b-card-group columns>
      <b-card v-for="item in result" :key="item.id" v-if="result && !isSeriesOrComics"
        :title="item.name"
        :img-src="item.thumbnail.path+'.'+item.thumbnail.extension"
        img-alt="Image"
        img-top
        tag="article"
        style="max-width: 20rem;"
        class="mb-2" >
        <b-card-text>
          {{item.description}}
        </b-card-text>
      </b-card>
    
      <b-card v-for="item in result" :key="item.id" v-if="result && isSeriesOrComics"
        :title="item.title"
        :img-src="item.thumbnail.path+'.'+item.thumbnail.extension"
        img-alt="Image"
        img-top
        tag="article"
        style="max-width: 20rem;"
        class="mb-2" >
        <b-card-text>
          <div>{{item.description}}</div>
          <div v-if="item.startYear && !item.endYear"
            class="text-black-50 mt-3">Ano: {{item.startYear}} à {{item.endYear}}</div>
        </b-card-text>
      </b-card>
    </b-card-group>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import LoadingSpinner from '~/components/LoadingSpinner'

export default {
  components: {  
    LoadingSpinner
  },
  computed: {
    ...mapState('marvel/search', [
      'query',
      'result',
      'isLoading',
      'error',
      'seriesOrComics'
    ]),

    isLoadingData() {
      return this.isLoading;
    },
    
    isSeriesOrComics() {
      return this.seriesOrComics
    },
  }
}
</script>
