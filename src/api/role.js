import request from '@/utils/request'

export function getRoutes() {
    return request({
        url: '/demo/api/routes',
        method: 'get'
    })
}

export function getRoles() {
    return request({
        url: '/demo/api/roles',
        method: 'get'
    })
}

export function addRole(data) {
    return request({
        url: '/demo/api/role',
        method: 'post',
        data
    })
}

export function updateRole(id, data) {
    return request({
        url: `/demo/api/role/${id}`,
        method: 'put',
        data
    })
}

export function deleteRole(id) {
    return request({
        url: `/demo/api/role/${id}`,
        method: 'delete'
    })
}