/* global CustomElement */
<template>
  <div id="app" v-if="loaded">
    <h1>Unsplash</h1>
    <input :disabled="element.disabled" v-model="searchTerm" placeholder="edit me">
    <button @click="searchPhotos">Search</button>
    <button @click="updateSize">Height?</button>
    <p>Saved: {{ value }} {{ height }}</p>
    <div class="masonry">
      <div class="item" v-for="result in searchResults.results" :key="result.id">
        <img :src="result.urls.thumb" />
        {{ result.description}}
      </div>
    </div>
  </div>
</template>

<script>
import Unsplash, { toJson } from 'unsplash-js'
import SampleData from './sample.json'

export default {
  name: 'app',
  data: function () {
    return {
      loaded: false,
      searchTerm: "test",
      searchResults: "",
      height: "",
      element: {},
      configuration: {}
    }
  },
  computed: {
    value() {
      return this.element.value
    },
    unsplashInstance() {
      return this.loaded
        ? new Unsplash({
            applicationId: this.element.config.accessKey,
            secret: this.element.config.secretKey
          })
        : null
    }
  },
  methods: {
    searchPhotos() {
      if(this.unsplashInstance && this.searchTerm) {
        // this.unsplashInstance.search.photos(this.searchTerm)
        // .then(toJson)
        // .then(json => {
        //   this.searchResults = json
        // })
        this.searchResults = SampleData
      }
    },
    updateSize() {
      // Update the custom element height in the Kentico UI.
      const height = document.documentElement.offsetHeight

      this.height = height
      CustomElement.setHeight(height);
    }
  },
  watch: {
    value: function(value) {
      if(!this.element.disabled) {
        CustomElement.setValue(value || null);
      }
    }
  },
  created: function() {
    CustomElement.init((element, context) => {
      // Set up the element with initial value
      this.element = element
      this.context = context
      this.loaded = true
    })
  },
  updated: function() {
    this.$nextTick(function() {
      this.updateSize()
    })
  }
}


</script>

<style>
@import url('https://yarnpkg.com/en/package/normalize.css');
html { background-color: crimson}
body {
  margin: 0;
  padding: 8px;
  background-color: orangered;
}
.masonry { /* Masonry container */
    column-count: 4;
    column-gap: 1em;
}

.item { /* Masonry bricks or child elements */
    background-color: #eee;
    display: inline-block;
    margin: 0 0 1em;
    width: 100%;
}

.item img {
  max-width: 100%;
  height: auto;
  display: block;
}
</style>
