import Vue from 'vue'
import VueMasonry from 'vue-masonry-css'
import VueResize from 'vue-resize'
import App from './App.vue'
import KenticoCloudCustomElement from './plugins/kentico-cloud-custom-element'
import Unsplash from './plugins/unsplash'

import 'bulma/css/bulma.css'
import 'vue-resize/dist/vue-resize.css'

Vue.use(VueMasonry);
Vue.use(VueResize);
Vue.use(KenticoCloudCustomElement)
Vue.use(Unsplash)

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
