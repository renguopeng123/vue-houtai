import request from '@/bpm/utils/request'

//Test
export function getPageList() {
    return request({
        url: '/page/list',
        method: 'get'
    })
}
