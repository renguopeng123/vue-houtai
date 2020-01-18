import request from "@/utils/request";

//系统树页面相关接口
/**
 * 展示树的列表数据
 * @param param 格式
 * {
 * 
 * }
 *
 * @returns {Promise<AxiosResponse<any>>}
 */
export function getdesystemTreeData(param) {
    return request({
        url: "/sys/sysTree/listJson",
        method: "get",
        params: param
    });
}

/**
 * 根据ID返回该行完整数据
 * @param param 格式
 * {
 * 
 * }
 *
 * @returns {Promise<AxiosResponse<any>>}
 */
export function getSystemtreefullInfoById(param) {
    return request({
        url: "/sys/sysTree/getObject",
        method: "post",
        params: param
    });
}

/**
 * 根据ID删除该行脚本信息
 * @param param 格式
 * {
 * 
 * }
 *
 * @returns {Promise<AxiosResponse<any>>}
 */
export function delSystreeById(param) {
    return request({
        url: "/sys/sysTree/remove",
        method: "delete",
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
export function saveEditsystemTreeinfo(param) {
    return request({
        url: "/sys/sysTree/save",
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
export function systemTreenodeinfo(param) {
    return request({
        url: "/sys/sysTreeNode/getNodes",
        method: "get",
        params: param
    });
}

/**
 * 保存节点数据
 * @param param 格式
 * {
 * 
 * }
 *
 * @returns {Promise<AxiosResponse<any>>}
 */
export function systemTreenodeSave(param) {
    return request({
        url: "/sys/sysTreeNode/save",
        method: "post",
        data: param
    });
}

/**
 * 删除节点数据
 * @param param 格式
 * {
 * 
 * }
 *
 * @returns {Promise<AxiosResponse<any>>}
 */
export function systemTreenodeDel(param) {
    return request({
        url: "/sys/sysTreeNode/remove",
        method: "DELETE",
        params: param
    });
}

