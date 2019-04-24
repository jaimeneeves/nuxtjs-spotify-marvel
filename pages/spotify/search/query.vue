<template>
  <div class="container">
    
    <template>
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
    </template>

    <template v-if="isTracksExists">
      <entity-header title="Tracks" small/>

      <tracks-list :tracks="getTracks"/>
    </template>
    
    <loading-spinner v-if="isLoadingData"/>

    <template v-if="isPlaylistsExists && (selected=='playlists' || selected=='all')">
      <entity-header title="Playlists" small />
      <media-container>
        <div class="row">
          <media-object v-for="(playlist, index) in playlists.items" v-if="index < maxResults"
            :key="playlist.id"
            :id="playlist.id"
            :uri="playlist.uri"
            :coverImg="playlist.images"
            :owner="playlist.owner"
            :name="playlist.name"
            :type="playlist.type"/>
        </div>
      </media-container>
    </template>

    <template v-if="isAlbumsExists && (selected=='albums' || selected=='all')">
      <entity-header
        title="Albums"
        small />
      <media-container>
        <div class="row">
          <media-object v-for="(album, index) in albums.items" v-if="index < maxResults"
            :key="album.id"
            :id="album.id"
            :uri="album.uri"
            :coverImg="album.images"
            :name="album.name"
            :artists="album.artists"
            :type="album.type"/>
        </div>
      </media-container>
    </template>

    <template v-if="isArtistsExists && (selected=='artists' || selected=='all')">
      <entity-header
        title="Artists"
        small/>
      <media-container>
        <div class="row">
          <media-object
            v-for="(artist, index) in artists.items"
            v-if="index < maxResults"
            :key="artist.id"
            :id="artist.id"
            :uri="artist.uri"
            :name="artist.name"
            :type="artist.type"
            :coverImg="artist.images"/>
        </div>
      </media-container>
    </template>
  </div>
</template>

<script>
  import { mapState } from 'vuex'

  import EntityHeader from '~/components/spotify/EntityHeader'
  import MediaObject from '~/components/spotify/MediaObject'
  import MediaContainer from '~/components/spotify/MediaContainer'
  import LoadingSpinner from '~/components/LoadingSpinner'
  import TracksList from '~/components/spotify/TracksList'

  export default {

    components: {
      TracksList,
      MediaObject,
      EntityHeader,
      MediaContainer,
      LoadingSpinner
    },

    data() {
      return {
        maxResults: 12,
        searchValue: '',
        selected: 'all',
        options: [
          { value: 'all', html: '<span class="badge badge-pill badge-warning">Todos</span>' },
          { value: 'playlists', html: '<span class="badge badge-pill badge-secondary">Playlists</span>' },
          { value: 'albums', html: '<span class="badge badge-pill badge-primary">Albums</span>' },
          { value: 'artists', html: '<span class="badge badge-pill badge-success">Artists</span>' }
        ]
      }
    },

    computed: {
      ...mapState('spotify/search', [
        'query',
        'result',
        'isLoading',
        'error',
        'albums',
        'tracks',
        'artists',
        'playlists',
      ]),

      isLoadingData() {
      return this.isLoading;
      },

      isTracksExists() {
        return this.tracks && this.tracks.total > 0
      },

      isAlbumsExists() {
        return this.albums && this.albums.total > 0
      },

      isArtistsExists() {
        return this.artists && this.artists.total > 0
      },

      isPlaylistsExists() {
        return this.playlists && this.playlists.total > 0
      },

      getTracks() {
        return this.tracks && this.tracks.items
          ? Object.keys(this.tracks.items)
            .slice(0, 5)
            .map(key => ({...this.tracks.items[key]}))
          : []
      }
    },

    methods: {
      goTo(name) {
        this.$router.push({name, params: {query: this.query}})
      }
    },
  }
</script>