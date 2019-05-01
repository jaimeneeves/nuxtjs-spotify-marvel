<template>
  <div class="container mt-5 mb-5">
    <b-card>
      <div class="text-center" >
        <loading-spinner v-if="isLoadingData"/>
      </div>
      
      <b-card-group columns>
        <Card v-for="(serie, index) in series.results" v-if="isSeriesExists"
          :key="serie.id"
          :id="serie.id"
          :coverImg="serie.thumbnail.path+'.'+serie.thumbnail.extension"
          :title="serie.name"
          :description="serie.description"
          :startYear="serie.startYear"
          :endYear="serie.endYear"/>
        
      </b-card-group>
    </b-card>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import LoadingSpinner from '~/components/LoadingSpinner'
import Card from '~/components/marvel/Card'

export default {
  layout: 'marvel',
  components: {  
    LoadingSpinner,
    Card
  },
  computed: {
    ...mapState('marvel/series', [
      'isLoading',
      'error',
      'series'
    ]),

    isLoadingData() {
      return this.isLoading;
    },

    isSeriesExists() {
      return this.series && this.series.results.length > 0
    }
  },
  mounted () {
    this.$nextTick(() => {
      this.index()
    })
  },
  methods: {
    ...mapActions({
      index: 'marvel/series/index',
    })
  },
}
</script>
