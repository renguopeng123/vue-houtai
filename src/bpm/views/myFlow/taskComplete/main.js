import Vue from 'vue'
import App from './App'

import * as filters from '@/filters'
import iView from 'iview'
import 'iview/dist/styles/iview.css';
import '@/bpm/ab-components/ab-form/ab-iview.css'
import '@/bpm/style/index.scss'
import '@/icons'
// import i18n from '@/lang'
import i18n from '@/bpm/ab-locale'


import importDirective from '@/bpm/ab-directive'
import { directive as clickOutside } from 'v-click-outside-x'
import installPlugin from '@/bpm/ab-plugin'

import AbLoad from '@/bpm/ab-components/ab-base/ab-load.js'
import abSave from '@/bpm/ab-components/ab-base/ab-save.vue'
import abGrid from '@/bpm/ab-components/ab-grid/ab-grid.vue'
import abCustDialog from '@/bpm/ab-components/ab-cust-dialog/ab-cust-dialog.vue'
import abCustQuery from '@/bpm/ab-components/ab-cust-dialog/ab-cust-query.js'

import AbTools from '@/bpm/ab-libs/abTools.js'
import AbHttpUtil from '@/bpm/ab-libs/abHttpUtil.js'
import config from '@/bpm/ab-config'


Vue.use(iView, {
    i18n: (key, value) => i18n.t(key, value)
})

// 注册全局过滤器，组件中可以直接使用
Object.keys(filters).forEach(key => {
    Vue.filter(key, filters[key])
})

Vue.component('abSave', abSave)
Vue.component('abGrid', abGrid)
Vue.component('abCustDialog', abCustDialog)
Vue.directive('abLoad', AbLoad)
Vue.directive('abCustQuery', abCustQuery)

Vue.use(AbTools)
Vue.use(AbHttpUtil)

/**
 *  全局注册应用配置
 */
Vue.prototype.$config = config

//阻止启动生产消息
Vue.config.productionTip = false

/**
 * 注册admin内置插件
 */
installPlugin(Vue)

/**
 * 注册指令
 */
importDirective(Vue)
Vue.directive('clickOutside', clickOutside)


new Vue({
    el: '#app',
    i18n,
    render: h => h(App)
})