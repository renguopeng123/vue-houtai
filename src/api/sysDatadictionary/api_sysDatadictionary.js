import request from "@/utils/request3";

//数据字典页面相关接口
/**
 * 展示树的列表数据
 * @param param 格式
 * {
 * 
 * }
 *
 * @returns {Promise<AxiosResponse<any>>}
 */
export function sysDatadictTreenodeinfo(param) {
    return request({
        url: "/sys/sysTreeNode/getNodes",
        method: "get",
        params: param
    });
}

/**
 * 根据ID返回该树完整数据
 * @param param 格式
 * {
 * 
 * }
 *
 * @returns {Promise<AxiosResponse<any>>}
 */
export function getSysdatadictiontreeListById(param) {
    return request({
        url: "/sys/dataDict/getDictList",
        method: "post",
        params: param
    });
}

/**
 * 根据ID删除该行信息
 * @param param 格式
 * {
 * 
 * }
 *
 * @returns {Promise<AxiosResponse<any>>}
 */
export function delSysDatadictionaryById(param) {
    return request({
        url: "sys/dataDict/remove",
        method: "post",
        params: param
    });
}

/**
 * 点击 新建或编辑保存数据
 * @param param 格式
 * {
 * 
 * }
 *
 * @returns {Promise<AxiosResponse<any>>}
 */
export function savesysDatadictionaryinfo(param) {
    return request({
        url: "/sys/dataDict/save",
        method: "post",
        data: param
    });
}

/**
 * 展示节点列表数据
 * @param param 格式
 * {
 * 
 * }
 *
 * @returns {Promise<AxiosResponse<any>>}
 */
// export function systemTreenodeinfo(param) {
//     return request({
//         url: "/sys/sysTreeNode/getNodes",
//         method: "get",
//         params: param
//     });
// }

/**
 * 保存节点数据
 * @param param 格式
 * {
 * 
 * }
 *
 * @returns {Promise<AxiosResponse<any>>}
 */
// export function systemTreenodeSave(param) {
//     return request({
//         url: "/sys/sysTreeNode/save",
//         method: "post",
//         data: param
//     });
// }

/**
 * 删除节点数据
 * @param param 格式
 * {
 * 
 * }
 *
 * @returns {Promise<AxiosResponse<any>>}
 */
// export function systemTreenodeDel(param) {
//     return request({
//         url: "/sys/sysTreeNode/remove",
//         method: "DELETE",
//         params: param
//     });
// }

