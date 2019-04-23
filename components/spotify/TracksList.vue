<template>
  <div v-if="tracks" class="tracks-list">
    <div
      v-for="(item, index) in tracks"
      :key="index"
      class="tracks-list__row"
      :class="isActiveTrack(item)">
      <div class="tracks-list__cell" v-if="item.album">
        <img class="tracks-list__img" :src="item.album.images[2].url" :alt="item.album.name"/>
      </div>

      <div class="tracks-list__cell tracks-list__cell--index">
        <span class="tracks-list__cell-index">{{index + 1}}</span>
        component
        <!-- <track-playback :trackUri="item.uri" :tracksUris="tracksUris" :contextUri="contextUri" :offset="index"/>-->
      </div>

      <div class="tracks-list__cell">
        component
        <!-- <track-addition :trackID="item.id" :isSaved="savedTracks[index]" v-on:updateTrackstatus="onTrackUpdate"/>-->
      </div>

      <div class="tracks-list__cell tracks-list__cell--name">
        {{item.name}}
        <span v-if="item.artists && showArtists">
            &nbsp;-&nbsp;
            <router-link
              class="tracks-list__link"
              v-for="(artist, index) in item.artists"
              :key="artist.id"
              :to="{name: 'artist', params:{id: artist.id}}">
             {{artist.name}}
            <template v-if="index !== (item.artists.length - 1)">,&nbsp;</template>
            </router-link>
           </span>
      </div>

      <div v-if="item.explicit" class="tracks-list__cell tracks-list__cell--explicit">
        <span class="tracks-list__explicit-label">Explicit</span>
      </div>

      <div class="tracks-list__cell tracks-list__cell--duration">
        {{item.duration_ms | msToMinutes}}
      </div>
    </div>
  </div>
</template>

<script>
  // import api from '@/api'
  import { mapGetters } from 'vuex'
  // import TrackAddition from '@/components/TrackAddition'
  // import TrackPlayback from '@/components/TrackPlayback'

  export default {
    components: {
      // TrackAddition,
      // TrackPlayback
    },

    props: {
      tracks: {
        type: Array,
        required: true
      },
      showArtists: {
        type: Boolean,
        default: false
      },
      contextUri: {
        type: String,
        required: false
      }
    },

    data() {
      return {
        tracksIds: '',
        savedTracks: [],
      }
    },

    computed: {
      ...mapGetters(
        'player', {
          playback: 'getPlayback',
          context: 'getPlaybackContext'
        }
      ),

      tracksUris() {
        return this.tracks ? this.tracks.map((el) => el.uri) : [];
      }
    },

    methods: {
      fetchTrackIds() {
        if (this.tracks) {
          this.tracksIds = this.tracks.map((el) => {
            return el.id;
          });
        }
      },

      async checkSavedTracks() {
        try {
          const saved = {
            offset: 0,
            limit: 50,
            total: this.tracks.length || 0,
            items: []
          };

          while (saved.total > saved.offset) {
            // const response = await api.spotify.library.checkUserSavedTracks(this.tracksIds.slice(saved.offset, saved.offset + saved.limit).toString());
            // saved.offset = saved.offset + saved.limit;
            // saved.items.push(...response.data);
          }

          this.savedTracks = saved.items;
        } catch (e) {
          console.log(e);
        }
      },

      isActiveTrack(current) {
        const isActiveTrack = this.playback.item && this.playback.item.id === current.id;

        return {
          'tracks-list__row--active': isActiveTrack,
          'tracks-list__row--paused': isActiveTrack && this.context && this.context.paused
        }
      },

      onTrackUpdate() {
        this.checkSavedTracks();
      },

    },

    watch: {
      tracks() {
        this.fetchTrackIds();
        this.checkSavedTracks();
      }
    }
  }
</script>

<style lang="scss">


</style>