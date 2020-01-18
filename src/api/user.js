import request from '@/utils/request'

// 关于post的提交

// 接口中使用了 params: data ，则无论是post还是get都会根据params对应的数据封装带查询参数的url，这里参考axios\lib\core\Axios.js 的 getUri 方法

// 如果使用post提交除了  method: 'post' 之外，还必须使用 data 或者 data:data，不能使用 params: data，params不会放到body体中

// 直接提交post json数据（body体中） 对应设置 Content-Type 为 application/json
// 参考代码 \axios\lib\defaults.js 中的 transformRequest 代码段
// 提交的数据为json对象即可

// 直接post form数据（body体中） 对应设置 Content-Type 为 application/x-www-form-urlencoded
// 参考代码 \axios\lib\defaults.js 中的 transformRequest 代码段
// 提交的json对象需要使用 qs转换查询参数的方式， qs.stringify(data) 后提交

// 提交文件流 multipart/form-data
// 参考代码 \axios\lib\defaults.js 中的 transformRequest 代码段
// 使用formdata，比如
// let data = new FormData();
// data.append("offset",0);
// 之后提交

// 设置 Accept
// Accept代表发送端（客户端）希望接受的数据类型。 比如：Accept：text/xml; 代表客户端希望接受的数据类型是xml类型。
// Content-Type代表发送端（客户端|服务器）发送的实体数据的数据类型。 比如：Content-Type：text/html; 代表发送端发送的数据格式是html。
// 参考代码 \axios\lib\defaults.js
// defaults.headers = {
//     common: {
//         'Accept': 'application/json, text/plain, */*'
//     }
// };

// 默认accept是json，可以通过接口封装时修改'Accept'来设置其他值。

export function login(data) {
    return request({
        url: '/auth/login-processing',
        method: 'post',
        data
    })
}

export function getInfo(token) {
    return request({
        url: '/auth/login-user',
        method: 'get',
        params: { token }
    })
}

export function logout(data) {
    return request({
        url: '/auth/logout',
        method: 'post',
        data
    })
}