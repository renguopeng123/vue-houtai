import request from '@/bpm/utils/request'

//登出
export function logout(data) {
    return request({
        url: '/logout',
        method: 'post',
        data
    })
}