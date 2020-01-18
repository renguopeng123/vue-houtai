import request from '@/bpm/utils/request'

/**
 * 流程列表
 */
export function definitionList(data) {
    return request({
        url: '/bpm/my/definitionList',
        method: 'post',
        params: data
    })
}

/**
 * 我的草稿
 */
//https://bpm.ecloud.work/ecloud-bpm-platform/bpm/my/draftList
export function draftList(data) {
    return request({
        url: '/bpm/my/draftList',
        method: 'post',
        params: data
    })
}

/**
 * 申请历史
 */
// https://bpm.ecloud.work/ecloud-bpm-platform/bpm/my/applyTaskList
export function applyTaskList(data) {
    return request({
        url: '/bpm/my/applyTaskList',
        method: 'post',
        params: data
    })
}

/**
 * 待办事宜
 */
//https://bpm.ecloud.work/ecloud-bpm-platform/bpm/my/todoTaskList
export function todoTaskList(data) {
    return request({
        url: '/bpm/my/todoTaskList',
        method: 'post',
        params: data
    })
}

/**
 * 办理历史
 */
//https://bpm.ecloud.work/ecloud-bpm-platform/bpm/my/approveList
export function approveList(data) {
    return request({
        url: '/bpm/my/approveList',
        method: 'post',
        params: data
    })
}