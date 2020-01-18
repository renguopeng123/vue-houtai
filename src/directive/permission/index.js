import permission from './permission'

//自定义指令的应用
// (v-model 和 v-show)，Vue 也允许注册自定义指令。
//Vue.directive用于注册指令
const install = function(Vue) {
    Vue.directive('permission', permission)
}

if (window.Vue) {
    window['permission'] = permission
    Vue.use(install); // eslint-disable-line
}

permission.install = install
export default permission