import request from "@/utils/request3";

//系统属性管理页面相关接口
/**
 * 获取系统数据源模板的列表数据
 * @param param 格式
 * {
 * 
 * }
 *
 * @returns {Promise<AxiosResponse<any>>}
 */
export function getAtributManageListData(param) {
    return request({
        url: "/sys/sysProperties/listJson",
        method: "post",
        data: param
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
export function getAttributManagementById(param) {
    return request({
        url: "/sys/sysProperties/getJson",
        method: "post",
        params: param
    });
}


/**
 * 新增保存系统属性
 * @param param 格式
 * {
 * 
 * }
 *
 * @returns {Promise<AxiosResponse<any>>}
 */
export function addEdiAtributes(param) {
    return request({
        url: "sys/sysProperties/save",
        method: "post",
        data: param
    });
}

/**
 * 删除系统属性
 * @param param 格式
 * {
 * 
 * }
 *
 * @returns {Promise<AxiosResponse<any>>}
 */
export function removeAtribute(param) {
    return request({
        url: "/sys/sysProperties/remove",
        method: "post",
        params: param
    });
}