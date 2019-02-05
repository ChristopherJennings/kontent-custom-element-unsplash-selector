<template>
  <div>
    <unsplash-selector-header />
    <unsplash-selector-search
      :disabled="disabled"
      :unsplashInstance="unsplashInstance"
      @select-photo="(photo) => $emit('select-photo', photo)"
      />
  </div>
</template>

<script>
import UnsplashSelectorHeader from './unsplash-selector-header'
import UnsplashSelectorSearch from './unsplash-selector-search'

export default {
  name: 'unsplash-selector',
  components: {
    UnsplashSelectorHeader,
    UnsplashSelectorSearch,
  },
  props: {
    disabled: {
      type: Boolean,
      default: false,
    },
    unsplashInstance: {
      type: Object,
      required: true,
    },
  }
}
</script>
