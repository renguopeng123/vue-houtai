import Vue from 'vue'
import Vuex from 'vuex'
import form from './form'
import getters from './getters'

Vue.use(Vuex)

const store = new Vuex.Store({
    modules: {
        form
    },
    getters
})

export default store