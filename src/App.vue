/* global CustomElement */
<template>
  <div id="app" v-if="loaded">
    <input :disabled="element.disabled" v-model="element.value" placeholder="edit me">
    <p>Saved: {{ value }}</p>
    <p>AK: {{ element.config.accessKey }}</p>
    <p>SK: {{ element.config.secretKey }}</p>
  </div>
</template>

<script>
export default {
  name: 'app',
  data: function () {
    return {
      loaded: false,
      element: {},
      configuration: {}
    }
  },
  computed: {
    value() {
      return this.element.value
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
    // console.log(element)
    // console.log(context)
})
  }
}
</script>

<style>

</style>
