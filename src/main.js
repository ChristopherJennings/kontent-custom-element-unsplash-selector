import Vue from 'vue'
import VueMasonry from 'vue-masonry-css'
import ImagesLoaded from 'vue-images-loaded'
import App from './App.vue'
import KenticoCloudCustomElement from './plugins/kentico-cloud-custom-element'

import 'bulma/css/bulma.css'

Vue.use(VueMasonry);
Vue.use(KenticoCloudCustomElement)

Vue.directive('images-loaded', ImagesLoaded)

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
