<template>
  <p>
    <span v-if="nolinks">
      Photo by {{ name }}
    </span>
    <span v-else>
      Photo by <a :href="`https://unsplash.com/${username}?utm_source=${appName}&utm_medium=referral`" rel="noopener" target="_blank">{{name}}</a>
      on
      <a :href="`https://unsplash.com/?utm_source=${appName}&utm_medium=referral`" rel="noopener" target="_blank">Unsplash</a>
    </span>
  </p>
</template>

<script>
export default {
  name: 'unsplash-attribution',
  props: {
    appName: {
      type: String,
      default: "kentico_cloud_custom_element"
    },
    username: {
      type: String,
      required: true
    },
    name: {
      type: String,
      required: true
    },
    nolinks: {
      type: Boolean,
      default: false
    }
  }
}
</script>

