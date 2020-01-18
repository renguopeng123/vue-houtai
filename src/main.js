import Vue from 'vue'

import Cookies from 'js-cookie'

import 'normalize.css/normalize.css' // A modern alternative to CSS resets

import Element from 'element-ui'
import './styles/element-variables.scss'
import './assets/font/bpm-icon/bpm-icon.css'

import '@/styles/index.scss' // global css

import App from './App'
import store from './store'
import router from './router'

import i18n from './lang' // Internationalization
import './icons' // icon
import './permission.js' // permission control
import './utils/errorLog' // error log

import * as filters from './filters' // global filters

// 生产环境的数据使用mockJS模拟数据，开发环境使用vue.config.js 配置 devServer 的 mock server 代理来模拟数据
// 生产环境如果不需要mockJS 则注释掉这里的内容
// import { mockXHR } from '../mock' // simulation data
// if (process.env.NODE_ENV === 'production') { mockXHR() }

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


//用于支持iview版本的自定义对话框！！
import iView from 'iview'
import 'iview/dist/styles/iview.css';
import abCustDialog from '@/bpm/ab-components/ab-cust-dialog/ab-cust-dialog.vue'
Vue.use(iView)
Vue.component('abCustDialog', abCustDialog)

import AbTools from '@/bpm/ab-libs/abTools.js'
import AbHttpUtil from '@/bpm/ab-libs/abHttpUtil.js'
Vue.use(AbTools)
Vue.use(AbHttpUtil)
    //用于支持iview版本的自定义对话框！！end

new Vue({
    el: '#app',
    router,
    store,
    i18n,
    render: h => h(App)
})