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
export function getSysDatasourceListData(param) {
    return request({
        url: "/sys/sysDataSource/listJson",
        method: "post",
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
export function geDatasourcefullInfoById(param) {
    return request({
        url: "/sys/sysDataSource/getObject",
        method: "post",
        params: param
    });
}

/**
 * 删除数据
 * @param param 格式
 * {
 * 
 * }
 *
 * @returns {Promise<AxiosResponse<any>>}
 */
export function removeDatasource(param) {
    return request({
        url: "/sys/sysDataSource/remove",
        method: "post",
        params: param
    });
}

/**
 * 新增保存
 * @param param 格式
 * {
 * 
 * }
 *
 * @returns {Promise<AxiosResponse<any>>}
 */
export function addSysDatasources(param) {
    return request({
        url: "sys/sysDataSource/save",
        method: "post",
        data: param
    });
}