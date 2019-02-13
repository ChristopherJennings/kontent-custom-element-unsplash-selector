import Unsplash from 'unsplash-js'

export default {
  // eslint-disable-next-line no-unused-vars
  install(vue, options) {
    vue.prototype.$Unsplash = {
      Instance: null,

      createInstance(options) {
        this.Instance = new Unsplash(options)
      }
    }
  }
}
