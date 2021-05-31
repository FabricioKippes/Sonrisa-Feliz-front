import '@babel/polyfill'
import 'mutationobserver-shim'
import Vue from 'vue'
import BootstrapVue from 'bootstrap-vue'
import App from './App.vue'
import router from './router'
import '@/logic/axios'
import '@/logic/toasted'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { far } from '@fortawesome/free-regular-svg-icons'
import { fab } from '@fortawesome/free-brands-svg-icons'


import VueFormWizard from 'vue-form-wizard'
import 'vue-form-wizard/dist/vue-form-wizard.min.css'
Vue.use(VueFormWizard)
import locale from 'element-ui/lib/locale/lang/en'
import Element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

// import 'element-ui/lib/theme-chalk/reset.css'
import '@/assets/themify/themify-icons.css'

import store from './store'
Vue.use(Element, { locale })


library.add(fas, far, fab)
Vue.component('font-awesome-icon', FontAwesomeIcon)
Vue.use(BootstrapVue)

Vue.config.productionTip = false
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
