import Vue from 'vue'
import App from './App.vue'

import ElementUI from "element-ui";
import 'element-ui/lib/theme-chalk/index.css';

// import demo from 'gwssi-app-demo/src/index';

// loading.loading();
// demo.say();
// demo.eleSay();

Vue.use(ElementUI, {
    size: "medium"
});

new Vue({
    el: '#app',
    render: h => h(App)
})