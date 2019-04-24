<template>
  <div v-if="tracks" class="tracks-list">
    <b-card-group columns>
      <b-card v-for="(item, index) in tracks" :key="index"
        tag="article"
        style="max-width: 20rem;">
        <b-card-text>{{item.name}}</b-card-text>
      </b-card>
    </b-card-group>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'

  export default {
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

    computed: {
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
      }
    }
  }
</script>
