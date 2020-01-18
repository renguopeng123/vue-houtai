import Cookies from 'js-cookie'


// console.log("VUE_APP_BASE_API" + process.env.VUE_APP_BASE_API);

const TokenKey = process.env.VUE_APP_USER_TOKEN

export function getToken() {
    return Cookies.get(TokenKey)
}

//前端会话，建议和后端分开维护，这里可以设置cookie的过期时间，默认为会话cookie
export function setToken(token) {
    return Cookies.set(TokenKey, token)
}

export function removeToken() {
    return Cookies.remove(TokenKey)
}