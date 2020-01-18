import Vue from 'vue'
import store from '@/store'
import { isString, isArray } from '@/utils/validate'
import settings from '@/settings'

// settings.js中配置需要记录错误日志的模式
// errorLog:'production' | ['production','development']
const { errorLog: needErrorLog } = settings

function checkNeed(arg) {
    const env = process.env.NODE_ENV
    if (isString(needErrorLog)) {
        return env === needErrorLog
    }
    if (isArray(needErrorLog)) {
        return needErrorLog.includes(env)
    }
    return false
}

if (checkNeed()) {
    Vue.config.errorHandler = function(err, vm, info) {
        // detail see https://forum.vuejs.org/t/dispatch-in-vue-config-errorhandler-has-some-problem/23500
        Vue.nextTick(() => {
            store.dispatch('errorLog/addErrorLog', {
                err,
                vm,
                info,
                url: window.location.href
            })
            console.error(err, info)
        })
    }
}