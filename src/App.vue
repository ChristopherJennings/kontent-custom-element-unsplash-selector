/* global CustomElement */
<template>
  <section
    class="section"
    id="app"
    v-if="loaded"
    v-image-load="updateSize"
  >

    <div class="content has-text-centered">
      <h1 class="title is-4">
        Unsplash
      </h1>
      <h2 class="subtitle is-6">
        Beautiful, free photos.<br>
        Gifted by the world’s most generous community of photographers. 🎁
      </h2>
    </div>
    <div class="content">
      <div class="field">
        <div class="control is-expanded has-icons-left">
          <input
            class="input is-rounded is-shadowless"
            :disabled="element.disabled"
            v-model="searchTerm"
            placeholder="Search free high-resolution photos"
            @keyup.enter="searchPhotos"
            @keyup.esc="searchTerm = ''"
          >
          <span
            class="icon is-small is-left"
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
    </div>
    <masonry
      cols="3"
      gutter="1.5rem"
      class="content"
      v-image-load="updateSize"
      v-if="searchResults.results"
      >
      <div class="content is-overlay-parent" v-for="result in searchResults.results" :key="result.id">
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
              {{ result.user.name }}
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

    <div class="card">
      <header class="card-header">
        <p class="card-header-title">
          Selected Photo from Unsplash
        </p>
      </header>
      <div
        class="card-content"
        v-if="loaded && value"
      >
        <div class="content">
          <figure>
            <img
              :src="value.urls.small"
            />
          </figure>
          {{ value.user.name }}
        </div>
      </div>
      <footer class="card-footer">
        <a href="#" class="card-footer-item">Change</a>
        <a href="#" class="card-footer-item">Delete</a>
      </footer>
    </div>
    <pre class="content is-hidden">KC Value: {{ value }}</pre>
  </section>
</template>

<script>
//import Unsplash, { toJson } from 'unsplash-js'
import SampleData from './sample.json'
import BeachSampleData from './sample-beach.json'
import ImageLoad from 'vue-images-loaded'

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
    ImageLoad
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
      } else {
        this.searchResults = {}
        this.updateSize()
      }
    },
    selectPhoto(result) {
      this.element.value = result
      this.searchTerm = ""
      this.searchPhotos()
      // TRIGGER UNSPLASH DOWNLOAD EVENT
    },
    updateSize() {
      this.$nextTick(function() {
        // Update the custom element height in the Kentico UI.
        let height = document.body.offsetHeight
        //const diff = height - this.height
        this.height = height
        CustomElement.setHeight(height)
      })
    }
  },
  watch: {
    value: function(value) {
      if(!this.element.disabled) {
        CustomElement.setValue(JSON.stringify(value) || null);
      }
    }
  },
  created: function() {
    CustomElement.init((element, context) => {
      // Set up the element with initial value
      this.element = element
      this.element.value = JSON.parse(this.element.value)
      this.context = context
      this.loaded = true
      this.updateSize()
    })
  }
}


</script>

<style>
html {
  overflow-y: hidden !important;
}
#app {
  padding: .5rem;
}

.is-overlay-parent {
  position: relative;
  line-height: 0;
}

.is-overlay-parent:not(:hover) .is-overlay {
  visibility: hidden;
  opacity: 0;
}

.is-overlay {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-image: linear-gradient(180deg,rgba(0,0,0,.2) 0,rgba(0,0,0,.199) 3.5%,rgba(0,0,0,.195) 7%,rgba(0,0,0,.19) 10.35%,rgba(0,0,0,.182) 13.85%,rgba(0,0,0,.174) 17.35%,rgba(0,0,0,.165) 20.85%,rgba(0,0,0,.155) 24.35%,rgba(0,0,0,.145) 27.85%,rgba(0,0,0,.135) 31.35%,rgba(0,0,0,.126) 34.85%,rgba(0,0,0,.118) 38.35%,rgba(0,0,0,.11) 41.85%,rgba(0,0,0,.105) 45.35%,rgba(0,0,0,.1) 48.85%,rgba(0,0,0,.103) 52.35%,rgba(0,0,0,.112) 55.85%,rgba(0,0,0,.126) 59.35%,rgba(0,0,0,.144) 62.85%,rgba(0,0,0,.165) 66.35%,rgba(0,0,0,.188) 69.85%,rgba(0,0,0,.213) 73.35%,rgba(0,0,0,.237) 76.85%,rgba(0,0,0,.262) 80.35%,rgba(0,0,0,.285) 83.85%,rgba(0,0,0,.306) 87.35%,rgba(0,0,0,.324) 90.85%,rgba(0,0,0,.338) 94.35%,rgba(0,0,0,.347) 97.85%,rgba(0,0,0,.35));
  pointer-events: none;
  transition: opacity .15s ease-in-out,visibility .15s ease-in-out;
  text-align: center;
  line-height: 1.5;
  color: #fff;
}

.is-overlay > div {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
}

.content .is-overlay figure {
  margin: 0.5rem auto !important;
}

.content .action-bar figure {
  width: 32px;
  height: 32px;
  margin: 0 10px 0 0;
}

.content .is-overlay .button {
  pointer-events: auto;
  padding: 0;
  height: 32px;
  width: 32px;
  margin-bottom: .5rem;
}

.content .is-overlay .button .icon {
  height: 24px;
  width: 24px;
  margin: 0;
}
</style>
