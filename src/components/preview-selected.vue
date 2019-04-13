<template>
  <div
    class="unsplash-thumbnail"
    >
    <div class="unsplash-preview">
      <div class="preview-action-bar">
        <span
          class="icon"
          @click="$emit('clear-photo')"
          v-if="!disabled"
          >
          <i class="fas fa-times"></i>
        </span>
      </div>
      <img
        :src="photo.urls.small"
        />
      <div class="preview-credits">
        <unsplash-attribution
          :username="photo.user.username"
          :name="photo.user.name"
          />
      </div>
    </div>
  </div>
</template>

<script>
import UnsplashAttribution from './unsplash-attribution'

export default {
  components: {
    UnsplashAttribution
  },
  props: {
    photo: {
      type: Object,
      required: true,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  }
}
</script>
