import request from "@/utils/request3";

/**
 * 流程定义-获取树结构
 * @param param Object
 * 格式：treeKey=flow&rootName=%E6%89%80%E6%9C%89%E6%95%B0%E6%8D%AE
 */
export function fetchSysTreeNode(param) {
    return request({
        url: "sys/sysTreeNode/getNodes",
        method: "post",
        data: param
    });
}
/**
 * 流程定义-获取流程列表
 * @param param Object
 * 格式：order=asc&offset=0&limit=10&type_id_%24VEQ=
 */
export function fetchFlow(param) {
    return request({
        url: "bpm/definition/listJson",
        method: "post",
        data: param
    });
}

/**
 * 流程定义-创建流程
 * @param param Object
 * 格式：order=asc&offset=0&limit=10&type_id_%24VEQ=
 */
export function addFlow(param) {
    return request({
        url: "bpm/definition/save",
        method: "post",
        data: param
    });
}

/**
 * 流程定义-删除流程
 * @param param Object
 * 格式：id=411274556765896705
 */
export function removeFlow(param) {
    return request({
        url: "bpm/definition/remove",
        method: "post",
        data: param
    });
}

/**
 * 流程定义-清楚缓存
 * @param param Object
 * 格式：id=411274556765896705
 */
export function clearFlow(param) {
    return request({
        url: "bpm/definition/clearSysCache",
        method: "post",
        data: param
    });
}