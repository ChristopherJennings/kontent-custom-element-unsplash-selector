/* global CustomElement */

export default {
  // eslint-disable-next-line no-unused-vars
  install(vue, options) {
    vue.prototype.$CustomElement = {
      updateSize() {
        vue.nextTick(function() {
          CustomElement.setHeight(document.body.offsetHeight)
        })
      }
    }
  }
}
