<template>
  <div v-if="tracks" class="tracks-list">

    <b-card-group columns>

      <b-card v-for="(item, index) in tracks" :key="index"
        img-alt="Image"
        img-top
        tag="article"
        style="max-width: 20rem;">
        <b-card-text>
          {{item.name}}
        </b-card-text>
      </b-card>
  

    </b-card-group>
    
      <!--<div class="col-3 mb-3" v-for="(item, index) in tracks" :key="index">
      <b-card no-body >
        <b-row no-gutters>
          <b-col md="6">
            <b-card-img :src="item.album.images[2].url" class="rounded-0"></b-card-img>
          </b-col>
          <b-col md="6">
            <b-card-body>
              <b-card-text>
                <div class="text-truncate">{{item.name}}</div>

                <span v-if="item.artists"> &nbsp;-&nbsp;
                  <router-link
                    class="tracks-list__link"
                    v-for="(artist, index) in item.artists"
                    :key="artist.id"
                    :to="{name: 'artist', params:{id: artist.id}}">
                  {{artist.name}}
                  <template v-if="index !== (item.artists.length - 1)">,&nbsp;</template>
                  </router-link>
                </span>
              </b-card-text>
            </b-card-body>
          </b-col>
        </b-row>
      </b-card>
      </div>-->


      <!--<div class="tracks-list__cell" v-if="item.album">
        <img class="tracks-list__img" :src="item.album.images[2].url" :alt="item.album.name"/>
      </div>-->

      <!--<div class="tracks-list__cell tracks-list__cell--name">
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
      </div>-->

      <!--<div v-if="item.explicit" class="tracks-list__cell tracks-list__cell--explicit">
        <span class="tracks-list__explicit-label">Explicit</span>
      </div> -->

      <!--<div class="tracks-list__cell tracks-list__cell--duration">
        {{item.duration_ms | msToMinutes}}
      </div>-->
    
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

    data() {
      return {
        tracksIds: '',
        savedTracks: [],
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
