/* global CustomElement */
<template>
  <section
    class="section"
    id="app"
    v-if="loaded"
    v-image-load="updateSize"
  >

    <!-- search -->
    <div v-if="!value && unsplashInstance">
      <div class="content has-text-centered">
        <h1 class="title">
          <svg
            version="1.1"
            viewBox="0 0 32 32"
            width="32"
            height="32"
            aria-hidden="false"
            >
            <path d="M10 9V0h12v9H10zm12 5h10v18H0V14h10v9h12v-9z"></path>
          </svg>
          Unsplash
        </h1>
      </div>
      <div class="content">
        <div class="field is-grouped">
          <div class="control">
          </div>
          <div class="control is-expanded has-icons-left">
            <input
              class="input is-rounded is-shadowless is-dark"
              :disabled="element.disabled"
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
    </div>
    <not-configured v-if="!unsplashInstance" />

    <!-- Have value; search hidden -->
    <preview-selected
      v-if="value"
      :photo="value"
      @clear-photo="clearPhoto()"
    />

    <pre
      v-if="showDebug"
      class="content"
    >Stored Value:
{{ value }}</pre>
  </section>
</template>

<script>
//import Unsplash, { toJson } from 'unsplash-js'
import ImageLoad from 'vue-images-loaded'
import Unsplash, { toJson } from 'unsplash-js'
import NotConfigured from './components/not-configured'
import PreviewSelected from './components/preview-selected'

export default {
  name: 'app',
  data: function () {
    return {
      loaded: false,
      searchTerm: "",
      searchResults: {},
      height: "",
      element: {},
      configuration: {},
      unsplashInstance: null
    }
  },
  components: {
    NotConfigured,
    PreviewSelected,
  },
  computed: {
    value() {
      return this.element.value
    },
    showDebug() {
      return this.element.config && this.element.config.debug
    }
  },
  directives: {
    ImageLoad
  },
  methods: {
    searchPhotos() {
      if(this.unsplashInstance && this.searchTerm) {
        this.unsplashInstance.search.photos(this.searchTerm)
        .then(toJson)
        .then(json => {
          this.searchResults = json
        })
      } else {
        this.searchResults = {}
        this.updateSize()
      }
    },
    selectPhoto(selectedPhoto) {
      this.element.value = selectedPhoto
      this.unsplashInstance.photos.downloadPhoto(selectedPhoto)
      this.showSearch = false
      this.searchTerm = ""
      this.searchPhotos()
    },
    clearPhoto() {
      this.element.value = null
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
      if(this.element.config && this.element.config.accessKey && this.element.config.secretKey) {
        this.unsplashInstance = new Unsplash({
          applicationId: this.element.config.accessKey,
          secret: this.element.config.secretKey
        })
      }

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

.unsplash-preview {
  position: relative;
  display: inline-block;
  line-height: 0;
}

.unsplash-preview .preview-action-bar,
.unsplash-preview .preview-credits {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  background-color: hsla(0,0%,96.1%,.85);
  line-height: 1.5rem;
}

.unsplash-preview .preview-credits {
  top: auto;
  bottom: 0
}

</style>
