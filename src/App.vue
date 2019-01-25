/* global CustomElement */
<template>
  <section class="section" id="app" v-if="loaded">
    <div class="container">
      <h1 class="title">Unsplash</h1>
    <div>
      <div class="field has-addons">
        <div class="control">
          <input
            class="input is-rounded"
            :disabled="element.disabled"
            v-model="searchTerm"
            placeholder="edit me"
            @keyup.enter="searchPhotos"
            @keyup.esc="searchTerm = ''"
          >
        </div>
        <div class="control">
          <button @click="searchPhotos" class="button is-rounded is-info">
            <span class="icon">
              <i class="fas fa-search"></i>
            </span>
          </button>
        </div>
      </div>
      <div class="control">
        <button class="button" @click="updateSize">Height?</button>
      </div>
    </div>

    <p>Saved: {{ value }} {{ height }}</p>
    <div class="masonry" v-imageload="updateSize">
      <div class="item" v-for="result in searchResults.results" :key="result.id">
        <img :src="result.urls.small" />
        <div>
          <img :src="result.user.profile_image.small" />
          {{ result.user.name }}
          <button>Select</button>
        </div>
        {{ result.description}}
      </div>
    </div>
    </div>
  </section>
</template>

<script>
//import Unsplash, { toJson } from 'unsplash-js'
import SampleData from './sample.json'
import BeachSampleData from './sample-beach.json'
import imageload from 'vue-images-loaded'

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
      // return this.loaded
      //   ? new Unsplash({
      //       applicationId: this.element.config.accessKey,
      //       secret: this.element.config.secretKey
      //     })
      //   : null
      return {}
    }
  },
  directives: {
    imageload
  },
  methods: {
    searchPhotos() {
      if(this.unsplashInstance && this.searchTerm) {
        // this.unsplashInstance.search.photos(this.searchTerm)
        // .then(toJson)
        // .then(json => {
        //   this.searchResults = json
        // })

        this.searchResults = this.searchTerm === 'beach' ? BeachSampleData : SampleData
      }
    },
    updateSize() {
      // Update the custom element height in the Kentico UI.
      const height = document.documentElement.offsetHeight
      //const diff = height - this.height
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

      this.$nextTick(function() {
        this.updateSize()
      })
    })
  },
  updated: function() {
    // this.$nextTick(function() {
    //   this.updateSize()
    // })
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
    column-count: 3;
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
