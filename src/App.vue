<template>
  <section
    class="section"
    id="app"
    v-if="loaded"
  >

    <not-configured v-if="!$Unsplash.Instance" />

    <preview-selected
      v-else-if="photo"
      :disabled="disabled"
      :photo="photo"
      @clear-photo="clearPhoto()"
    />

    <unsplash-selector
      v-else
      :disabled="disabled"
      @select-photo="(selection) => photo = selection"
      />

    <pre
      v-if="showDebug"
      class="content"
    >Selected photo details:
{{ photo }}</pre>
    <resize-observer @notify="$CustomElement.updateSize" />
  </section>
</template>

<script>
import NotConfigured from './components/not-configured'
import PreviewSelected from './components/preview-selected'
import UnsplashSelector from './components/unsplash-selector'

export default {
  name: 'app',
  data() {
    return {
      loaded: false,
      disabled: false,
      photo: null,
      element: {},
      configuration: {},
    }
  },
  components: {
    NotConfigured,
    PreviewSelected,
    UnsplashSelector,
  },
  computed: {
    showDebug() {
      return this.element.config && this.element.config.debug
    }
  },
  methods: {
    clearPhoto() {
      this.photo = null
    },
    handleDisable(disableState) {
      this.disabled = disableState
    }
  },
  watch: {
    photo: function(photo) {
      if(!this.element.disabled) {
        // Push new value out to Kentico Cloud
        const newValue = photo ? JSON.stringify(photo) : ""
        this.$CustomElement.setValue(newValue);
      }
    }
  },
  created: function() {
    // Perform init of Kentico CLoud Custom Element code
    CustomElement.init((element, context) => {
      // Map element and context details to local state
      this.element = element
      this.context = context

      // Load previously saved data as JSON
      try {
        this.photo = JSON.parse(element.value)
      } catch (error) {
        // TODO: display error to user
        this.photo = null
      }

      this.disabled = this.element.disabled

      // Instantiate Unsplash API
      if(this.element.config && this.element.config.accessKey && this.element.config.secretKey) {
        this.$Unsplash.createInstance({
          applicationId: this.element.config.accessKey,
          secret: this.element.config.secretKey
        })
      }
      this.loaded = true
      this.$CustomElement.updateSize()
    })

    CustomElement.onDisabledChanged(this.handleDisable);
  }
}


</script>

<style>
html {
  overflow-y: hidden !important;
}
#app {
  padding: .5rem;
  position: relative;
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
