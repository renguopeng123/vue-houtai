//单页面的request
import axios from 'axios'
import {
    MessageBox,
    Message
} from 'element-ui'

// create an axios instance
const service = axios.create({
    baseURL: process.env.VUE_APP_BPM_API, // api 的 base_url
    withCredentials: true, // 跨域请求时发送 cookies
    timeout: 5000 // request timeout
})

// request 拦截器，主要用于提交之前对公共数据的封装
service.interceptors.request.use(
    config => {
        return config
    },
    error => {
        console.log(error)
        Promise.reject(error)
    }
)

// response interceptor
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
                    window.location.href = "/"
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