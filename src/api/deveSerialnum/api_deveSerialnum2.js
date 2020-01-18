import request from "@/utils/request";

//流水号页面相关接口
/**
 * 获取流水号的列表数据
 * @param param 格式
 * {
 * 
 * }
 *
 * @returns {Promise<AxiosResponse<any>>}
 */
export function getdeveSerialnumData(param) {
    return request({
        url: "/sys/serialNo/listJson",
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
export function getDeveservialfullInfoById(param) {
    return request({
        url: "/agile-bpm-platform/sys/serialNo/getById",
        method: "post",
        params: param
    });
}

/**
 * 根据别名返回该行流水号预览信息
 * @param param 格式
 * {
 * 
 * }
 *
 * @returns {Promise<AxiosResponse<any>>}
 */
// export function getDeveservialInfoByname(param) {
//     return request({
//         url: "/agile-bpm-platform/sys/serialNo/preview",
//         method: "post",
//         params: param
//     });
// }

/**
 * 根据ID删除该行流水号
 * @param param 格式
 * {
 * 
 * }
 *
 * @returns {Promise<AxiosResponse<any>>}
 */
export function delDeveservialById(param) {
    return request({
        url: "/agile-bpm-platform/sys/serialNo/remove",
        method: "post",
        params: param
    });
}

/**
 * 点击保存该新建的流水号信息
 * @param param 格式
 * {
 * 
 * }
 *
 * @returns {Promise<AxiosResponse<any>>}
 */
export function saveDeveservial(param) {
    return request({
        url: "/agile-bpm-platform/sys/serialNo/save",
        method: "post",
        data: param
    });
}