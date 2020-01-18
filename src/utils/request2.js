import axios from 'axios'
import {
    MessageBox,
    Message
} from 'element-ui'
import store from '@/store'
import {
    getToken
} from '@/utils/auth'

// create an axios instance
const service = axios.create({
    baseURL: process.env.VUE_APP_BASE_API, // api 的 base_url
    withCredentials: true, // 跨域请求时发送 cookies
    timeout: 5000 // request timeout
})

// request 拦截器，主要用于提交之前对公共数据的封装
// service.interceptors.request.use(
//     config => {
//         // Do something before request is sent
//         if (store.getters.token) {
//             // 让每个请求携带token-- ['X-Token']为自定义key 请根据实际情况自行修改
//             config.headers['X-Token'] = getToken()

//             //比如前端需要访问多域名接口 需要传递TOKEN保证会话一致性 可以在这里统一设置
//         }
//         return config
//     },
//     error => {
//         // Do something with request error
//         console.log(error) // for debug
//         Promise.reject(error)
//     }
// )

// request interceptor
// service.interceptors.request.use(
//     config => {
//         let token = store.getters.token;
//         if (token) {
//             // 判断是否存在token，如果存在的话，则每个http header都加上token
//             config.headers["Cookie"] = token;
//         }
//         return config;
//     },
//     error => {
//         // Do something with request error
//         console.log(error); // for debug
//         Promise.reject(error);
//     }
// );
// response interceptor
service.interceptors.response.use(

    response => {

        const res = response.data
            //正常200的请求，如果res中包含错误代码，可以这里判断
        return res

    },
    //如果http状态码不是200
    error => {

        //这里根据通用微服务平台做封装，如果是错误页面则会返回一个对应的JSON对象
        // {
        //     "code": 401,
        //     "data": "",
        //     "exceptionClazz": "org.springframework.security.authentication.BadCredentialsException",
        //     "message": "没有此用户",
        //     "path": "/auth/login-processing",
        //     "success": false,
        //     "timestamp": "2019-06-26 19:22:17"
        // }

        const response = error.response;
        const res = response.data;
        const status = response.status;

        console.error('err : ' + error.message)

        //403错误是没有权限错误，直接登出到登陆页面
        if (status == 403) {

            MessageBox.alert('您已被登出，请重新登录。', '用户失效', {
                confirmButtonText: '重新登录',
                type: 'warning',
                callback: action => {
                    store.dispatch('user/resetToken').then(() => {
                        location.reload() // 为了重新实例化vue-router对象 避免bug
                    })
                }
            });


        } else {

            var message = error.message;

            if (res.code != null) {
                message = res.code + " : " + res.message
            }

            //其它错误直接提示
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