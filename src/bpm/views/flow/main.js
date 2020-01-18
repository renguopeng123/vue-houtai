import Vue from 'vue'
import Cookies from 'js-cookie'
import Element from 'element-ui'
import '@/styles/element-variables.scss'
import '@/bpm/style/index.scss'
import i18n from '@/lang'
import '@/icons'
import * as filters from '@/filters'

import App from './App'

//element UI的初始配置
Vue.use(Element, {
    size: Cookies.get('size') || 'medium',
    i18n: (key, value) => i18n.t(key, value)
})

// 注册全局过滤器，组件中可以直接使用
Object.keys(filters).forEach(key => {
    Vue.filter(key, filters[key])
})

//阻止启动生产消息
Vue.config.productionTip = false

new Vue({
    el: '#app',
    i18n,
    render: h => h(App)
})