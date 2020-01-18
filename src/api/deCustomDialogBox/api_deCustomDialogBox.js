import request from "@/utils/request3";

//自定义对话框页面相关接口
/**
 * 获取流水号的列表数据
 * @param param 格式
 * {
 * 
 * }
 *
 * @returns {Promise<AxiosResponse<any>>}
 */
export function getdecusdialogboxData(param) {
    return request({
        url: "/form/formCustDialog/listJson",
        method: "post",
        params: param
    });
}

/**
 * 根据别名返回该行的预览信息
 * @param param 格式
 * {
 * 
 * }
 *
 * @returns {Promise<AxiosResponse<any>>}
 */
export function getDeveservialInfoByname(param,subPath) {
    return request({
        url: "/form/formCustDialog/listData_"+ subPath,
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
export function getDecustomboxfullInfo(param) {
    return request({
        url: "/form/formCustDialog/getObject",
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
// export function delDescriptById(param) {
//     return request({
//         url: "/agile-bpm-platform/sys/script/remove",
//         method: "post",
//         params: param
//     });
// }

/**
 * 点击保存该新建的流水号信息
 * @param param 格式
 * {
 * 
 * }
 *
 * @returns {Promise<AxiosResponse<any>>}
 */
// export function saveDescriptinfo(param) {
//     return request({
//         url: "/agile-bpm-platform/sys/script/save",
//         method: "post",
//         data: param
//     });
// }