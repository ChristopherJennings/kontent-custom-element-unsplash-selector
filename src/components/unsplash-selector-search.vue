<template>
  <div class="content">
    <div class="field is-grouped">
      <div class="control is-expanded has-icons-left">
        <input
          class="input is-rounded is-shadowless is-dark"
          :disabled="disabled"
          v-model="searchTerm"
          placeholder="Search free high-resolution photos on Unsplash"
          @keyup.enter="searchPhotos"
          @keyup.esc="searchTerm = ''"
        >
        <span
          class="icon is-small is-left has-text-dark"
          @click="searchPhotos"
        >
          <i class="fas fa-search"></i>
        </span>
        <span
          v-if="searchTerm"
          class="icon is-small is-right"
          @click="searchTerm = ''"
        >
          <i class="fas fa-times"></i>
        </span>
      </div>
    </div>
    <masonry
      cols="3"
      gutter="1.5rem"
      class="content"
      v-if="searchResponse.results"
      v-images-loaded="$CustomElement.updateSize"
      >
      <div class="content is-overlay-parent" v-for="result in searchResponse.results" :key="result.id">
        <img :src="result.urls.small"/>
        <div class="is-overlay">
          <div>
            <figure class="image is-32x32">
              <img
                :src="result.user.profile_image.small"
                class="is-rounded"
              />
            </figure>
            <div>
              <unsplash-attribution
                :username="result.user.username"
                :name="result.user.name"
                nolinks
                />
            </div>
            <div>
              <button
                class="button"
                @click="selectPhoto(result)"
              >
                <span class="icon is-small">
                  <i class="fas fa-arrow-down"></i>
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </masonry>
  </div>
</template>

<script>
import { toJson } from 'unsplash-js'
import UnsplashAttribution from './unsplash-attribution'

export default {
  name: 'unsplash-selector-search',
  components: {
    UnsplashAttribution
  },
  props: {
    disabled: {
      type: Boolean,
      default: false,
    },
    unsplashInstance: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      searchTerm: "",
      searchResponse: {}
    }
  },
  methods: {
    searchPhotos() {
      if(this.unsplashInstance && this.searchTerm) {
        this.unsplashInstance.search.photos(this.searchTerm)
        .then(toJson)
        .then(json => {
          this.searchResponse = json
        })
      } else {
        this.searchResponse = {}
      }
    },
    selectPhoto(photo) {
      // Tell Unsplash that the photo was selected
      this.unsplashInstance.photos.downloadPhoto(photo)
      this.$emit('select-photo', photo)
      // Copy the photo details to local state
      // this.photo = photo

      // this.showSearch = false
      // this.searchTerm = ""
      // this.searchPhotos()
    },
  }
}
</script>
