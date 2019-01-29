<template>
  <p>
    Photo by <a :href="`https://unsplash.com/${username}?utm_source=${appName}&utm_medium=referral`" target="_blank">{{name}}</a>
    on
    <a :href="`https://unsplash.com/?utm_source=${appName}&utm_medium=referral`" target="_blank">Unsplash</a>
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
  }
}
</script>

