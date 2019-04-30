<template>
  <div class="container mt-5 mb-5">
    <b-card>
      <div class="text-center" >
        <loading-spinner v-if="isLoadingData"/>
      </div>
      
      <b-card-group columns>
        
        <Card v-for="(serie, index) in series.results" v-if="isSeriesExists && type === 'series'"
          :key="serie.id"
          :id="serie.id"
          :coverImg="serie.thumbnail.path+'.'+serie.thumbnail.extension"
          :title="serie.name"
          :description="serie.description"
          :startYear="serie.startYear"
          :endYear="serie.endYear"/>

        <Card v-for="(character, index) in characters.results" v-if="isCharactersExists && type === 'characters'"
          :key="character.id"
          :id="character.id"
          :coverImg="character.thumbnail.path+'.'+character.thumbnail.extension"
          :title="character.name"
          :description="character.description"/>

        <Card v-for="(comic, index) in comics.results" v-if="isComicsExists  && type === 'comics'"
          :key="comic.id"
          :id="comic.id"
          :coverImg="comic.thumbnail.path+'.'+comic.thumbnail.extension"
          :title="comic.title"
          :description="comic.description"/>
        
      </b-card-group>
    </b-card>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import LoadingSpinner from '~/components/LoadingSpinner'
import Card from '~/components/marvel/Card'

export default {
  layout: 'marvel',
  components: {  
    LoadingSpinner,
    Card
  },
  computed: {
    ...mapState('marvel/search', [
      'query',
      'result',
      'isLoading',
      'error',
      'type',
      'series',
      'characters',
      'comics'
    ]),

    isLoadingData() {
      return this.isLoading;
    },

    isSeriesExists() {
      return this.series && this.series.results.length > 0
    },

    isCharactersExists() {
      return this.characters && this.characters.results.length > 0
    },
    
    isComicsExists() {
      return this.comics && this.comics.results.length > 0
    },
  }
}
</script>
