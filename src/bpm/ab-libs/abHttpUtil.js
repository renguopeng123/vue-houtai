import Vue from 'vue'
import Axios from 'axios'
import Qs from 'qs'
import config from '@/bpm/ab-config'


//定义前端ctx 路径
const baseUrl = process.env.NODE_ENV === 'development' ? config.baseUrl.dev : config.baseUrl.pro

var axios = Axios.create({　
    baseURL: baseUrl,
    　timeout: '18000', //请求超时时间
    //header传值，例如：Authorization
    　headers: {}
})
axios.defaults.withCredentials = true;

axios.interceptors.request.use(function(request) {
    request.credentials = true;
    return request;
})

// 设置通用的拦截器
axios.interceptors.response.use(function(response) {
    if (response.data && !response.data.isOk && response.data.code === "401") {
        // Vue.prototype.$Message.error("登录超时，请重新登录");
        return response;
    }
    if (response.data && !response.data.isOk && response.data.code === "403") {
        Vue.prototype.$Message.error("访问受限!，路由到无权限页面 ");
        return response;
    }
    return response;
}, function(error) {
    //通用异常
    return Promise.reject(error);
});


// Http Util 基础服务
var HttpUtil = {
    get: function(url) {
        return new Promise((resolve, reject) => {
            axios.get(url)
                .then(response => {
                    resolve(response.data);
                })
                .catch(error => {
                    console.log("请求失败：", error);
                    reject(error)
                })
        })
    },
    post: function(url, data) {
        if (!data) data = {};

        return new Promise((resolve, reject) => {
            axios.post(url, data)
                .then(response => {
                    resolve(response.data);
                })
                .catch(error => {
                    console.log("请求失败：", error);
                    reject(error)
                })
        })

    },
    // form-data格式化
    postForm: function(url, data) {
        if (!data) data = {};
        return new Promise((resolve, reject) => {
            axios.post(url, data, { transformRequest: this.jsonToFormData, headers: { "Content-Type": "application/x-www-form-urlencoded; charset=utf-8" } })
                .then(response => {
                    resolve(response.data);
                })
                .catch(error => {
                    console.log("请求失败：", error);
                    reject(error)
                })
        })
    }

    ,
    jsonToFormData: function(data) {
        data = Qs.stringify(data, { arrayFormat: 'brackets' }); // qs.stringify(params)
        return data;
    }
}

export default {
    // 全局安装时候
    install(Vue) {
        Vue.abHttpUtil = HttpUtil;
        Vue.prototype.abHttpUtil = HttpUtil;
    },
    abHttpUtil: HttpUtil
}