import request from "@/utils/request3";

//系统数据源模板页面相关接口
/**
 * 获取系统数据源模板的列表数据
 * @param param 格式
 * {
 * 
 * }
 *
 * @returns {Promise<AxiosResponse<any>>}
 */
export function getDatasourceListData(param) {
    return request({
        url: "/sys/sysDataSourceDef/listJson",
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
export function getDStempInfoById(param) {
    return request({
        url: "sys/sysDataSourceDef/getObject",
        method: "post",
        params: param
    });
}

/**
 * 新增保存数据源模板
 * @param param 格式
 * {
 * 
 * }
 *
 * @returns {Promise<AxiosResponse<any>>}
 */
export function addEdiDStemp(param) {
    return request({
        url: "/sys/sysDataSourceDef/save",
        method: "post",
        data: param
    });
}

/**
 * 删除数据源模板
 * @param param 格式
 * {
 * 
 * }
 *
 * @returns {Promise<AxiosResponse<any>>}
 */
export function removeDStemp(param) {
    return request({
        url: "/sys/sysDataSourceDef/remove",
        method: "post",
        params: param
    });
}