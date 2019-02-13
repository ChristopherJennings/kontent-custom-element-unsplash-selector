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
      </div>
    </div>
    <unsplash-selector-results
      v-if="searchResponse.results"
      :results="searchResponse.results"
      @select-photo="selectPhoto"
      />
  </div>
</template>

<script>
import { toJson } from 'unsplash-js'
import UnsplashSelectorResults from './unsplash-selector-results'

export default {
  name: 'unsplash-selector-search',
  components: {
    UnsplashSelectorResults
  },
  props: {
    disabled: {
      type: Boolean,
      default: false,
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
      const unsplash = this.$Unsplash.Instance
      if(this.searchTerm && unsplash) {
        unsplash.search.photos(this.searchTerm)
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
      this.$Unsplash.Instance.photos.downloadPhoto(photo)
      this.$emit('select-photo', photo)
    },
  }
}
</script>
