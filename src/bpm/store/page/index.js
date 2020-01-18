import Vue from 'vue'
import Vuex from 'vuex'
import page from './modules/page'
import settings from './modules/settings'
import component from './modules/component'
import getters from './getters'

Vue.use(Vuex)

const store = new Vuex.Store({
    modules: {
        settings,
        page,
        component
    },
    getters
})

export default store