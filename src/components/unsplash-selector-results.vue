<template>
  <div>
    <masonry
      cols="3"
      gutter="1.5rem"
      class="content"
      v-if="results.length > 0"
      >
      <div class="content is-overlay-parent" v-for="result in results" :key="result.id">
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
                @click="$emit('select-photo', result)"
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
    <div v-else>
      No Results
    </div>
  </div>
</template>

<script>
import UnsplashAttribution from './unsplash-attribution'

export default {
  name: 'unsplash-selector-results',
  components: {
    UnsplashAttribution
  },
  props: {
    results: {
      type: Array,
      default: () => [],
      required: false,
    }
  },
}
</script>
