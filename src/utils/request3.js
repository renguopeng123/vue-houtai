import axios from 'axios'
import {
    MessageBox,
    Message
} from 'element-ui'
import store from '@/store'

// create an axios instance
const service = axios.create({
    baseURL: process.env.VUE_APP_BPM_API, // api 的 base_url
    withCredentials: true, // 跨域请求时发送 cookies
    timeout: 5000 // request timeout
})

service.interceptors.response.use(

    response => {
        const res = response.data
            //正常200的请求，如果res中包含错误代码，可以这里判断

        //401 登陆超时 可以直接踢出
        //{"code":"401","isOk":false,"msg":"登录访问超时！"}

        if (res.code && res.code == "401") {
            MessageBox.alert('您已被登出，请重新登录。', '用户失效', {
                confirmButtonText: '重新登录',
                type: 'warning',
                callback: action => {
                    store.dispatch('user/resetToken').then(() => {
                        location.reload() // 为了重新实例化vue-router对象 避免bug
                    })
                }
            });
        }

        if (res.code && res.code != "200") {
            Message({
                message: res.msg,
                type: 'error',
                duration: 5 * 1000
            })
        }

        return res
    },
    //如果http状态码不是200
    error => {

        var message = error.message;

        //其它错误直接提示
        if (message != "Network Error") {
            Message({
                message: message,
                type: 'error',
                duration: 5 * 1000
            })
        }

        return Promise.reject(error)
    }

)

export default service