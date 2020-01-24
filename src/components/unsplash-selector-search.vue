<template>
  <div class="content">
    <div class="field is-grouped">
      <div class="control is-expanded has-icons-left">
        <input
          class="input is-rounded is-shadowless is-dark"
          :disabled="disabled"
          v-model="searchTerm"
          placeholder="Search free high-resolution photos on Unsplash"
          @keyup.enter="searchPhotos(1)"
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
      v-if="searchResults"
      :results="searchResults"
      @select-photo="selectPhoto"
      />
      <button v-if="showLoadMore" @click="searchPhotos(nextPageToLoad)" style="margin-top: 1rem" class="button is-outlined is-rounded is-black is-fullwidth">Load More</button>
  </div>
</template>

<script>
import unsplash from '../unsplashApi'
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
      searchResponse: {},
      searchResults: null,
      nextPageToLoad: 1
    }
  },
  methods: {
    searchPhotos(page) {
      this.nextPageToLoad = page ? page : this.nextPageToLoad
      if(this.searchTerm) {
        unsplash.searchPhotos(this.searchTerm, this.nextPageToLoad).then(response =>{
          this.searchResponse = response.data
          if(this.searchResults === null) {
            this.searchResults = this.searchResponse.results
          } else {
            this.searchResults.push(...this.searchResponse.results)
          }
          this.nextPageToLoad = this.nextPageToLoad + 1
        })
      } else {
        this.searchResponse = {}
        this.searchResults = null
        this.nextPageToLoad = 1
      }
    },
    selectPhoto(photo) {
      // Tell Unsplash that the photo was selected
      unsplash.trackDownload(photo.id)
      this.$emit('select-photo', photo)
    },
  },
  computed: {
    showLoadMore: function() {
      return this.searchResponse && this.searchResponse.total_pages >= this.nextPageToLoad
    }
  },
  watch: {
    searchTerm: function () {
      this.nextPageToLoad = 1
      this.searchResponse = {}
      this.searchResults = null
    }
  }
}
</script>
