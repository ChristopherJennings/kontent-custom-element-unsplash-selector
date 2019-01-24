/* global CustomElement */
<template>
  <div id="app" v-if="loaded">
    <input :disabled="element.disabled" v-model="searchTerm" placeholder="edit me">
    <button @click="searchPhotos">Search</button>
    <p>Saved: {{ value }} {{ height }}</p>
    <pre v-html="searchResults"></pre>
  </div>
</template>

<script>
import Unsplash, { toJson } from 'unsplash-js'

export default {
  name: 'app',
  data: function () {
    return {
      loaded: false,
      searchTerm: "",
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
        this.unsplashInstance.search.photos(this.searchTerm)
        .then(toJson)
        .then(json => {
          this.searchResults = json
        })
      }
    },
    updateSize() {
      // Update the custom element height in the Kentico UI.
      const height = Math.max(
        document.body.scrollHeight,
        document.body.offsetHeight,
        document.documentElement.clientHeight,
        document.documentElement.scrollHeight,
        document.documentElement.offsetHeight
      )

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
      this.updateSize()
    })
  },
  updated: function() {
    this.updateSize()
  }
}


</script>

<style>

</style>
